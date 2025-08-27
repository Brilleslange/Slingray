package net.slingray.services

import net.slingray.model.Assignment
import net.slingray.model.Color
import net.slingray.model.ColorPair
import net.slingray.model.Faction
import net.slingray.model.Request
import net.slingray.model.Score
import net.slingray.model.Scoring

fun assign(request: Request): List<Assignment> {
    val factions = request.factions.filter { request.expansionStates[it.expansion] == true }
    if (factions.size < 3) throw AssignmentException("Must select at least 3 factions")

    val colors = Color.entries.toList().filter { request.expansionStates[it.expansion] == true }
    if (factions.size > colors.size) throw AssignmentException("Cannot select more than ${colors.size} factions")

    val excludedColors = request.excludedColors.filter { it.firstColor == it.secondColor }.map { it.firstColor }.toSet()
    if (factions.size > (colors.size - excludedColors.size)) throw AssignmentException("Too many colors excluded")

    val excludedColorPairs = request.excludedColors.filter { it.firstColor != it.secondColor }.map {
        val colorPair = listOf(it.firstColor, it.secondColor).sorted()
        ColorPair(colorPair.first(), colorPair.last())
    }.toSet()

    val allPermutations = permutations(colors.filter { !excludedColors.contains(it) }, factions.size)
    val possiblePermutations = allPermutations.filterNot { permutation ->
        excludedColorPairs.any { excludedColorPair ->
            permutation.contains(excludedColorPair.firstColor) && permutation.contains(excludedColorPair.secondColor)
        }
    }
    if (possiblePermutations.isEmpty()) throw AssignmentException("Too many color pairs excluded")

    val maxScoringPermutations = findMaxScoringPermutations(possiblePermutations, factions, request.scoring)
    val assignments = maxScoringPermutations.map { permutation ->
        permutation.mapIndexed { index, color ->
            val faction = factions[index]
            Assignment(faction, color)
        }
    }

    return when (assignments.size) {
        0 -> throw AssignmentException("Assignment not found")
        1 -> assignments.single()
        else -> assignments.random()
    }
}

private fun findMaxScoringPermutations(
    possiblePermutations: List<List<Color>>,
    factions: List<Faction>,
    scorings: List<Scoring>
): List<List<Color>> {
    val scores = possiblePermutations.map { permutation ->
        val score = factions.sumOf { faction ->
            val index = factions.indexOf(faction)
            val scoring = scorings.find { it.faction == faction }
                ?: throw AssignmentException("Scoring for faction ${faction.long} not found")
            val color = permutation[index]

            return@sumOf scoring.scores[color]
                ?: throw AssignmentException("Color ${color.color.lowercase()} not found in scoring for faction ${faction.long}")
        }

        Score(permutation, score)
    }

    val maxScore = scores.maxOf { it.score }
    val maxScoringPermutations = scores.filter { it.score == maxScore }.map { it.permutation }
    return maxScoringPermutations
}

fun permutations(list: List<Color>, size: Int): Set<List<Color>> {
    if (size == 0) return setOf(emptyList())
    if (list.size == 1) return setOf(list)

    val perms = mutableSetOf<List<Color>>()

    fun helper(prefix: List<Color>, remaining: List<Color>) {
        if (prefix.size == size) {
            perms.add(prefix)
            return
        } else for (i in remaining.indices) {
            val color = remaining[i]
            val rest = remaining.toMutableList().apply { removeAt(i) }
            helper(prefix + color, rest)
        }
    }

    helper(emptyList(), list)
    return perms
}

class AssignmentException(message: String) : Exception(message)
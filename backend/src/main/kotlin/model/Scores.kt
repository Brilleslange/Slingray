package net.slingray.model

import kotlinx.serialization.Serializable

@Serializable
data class Scores(
    val faction: Faction,
    val scores: Map<Color, Int>
)

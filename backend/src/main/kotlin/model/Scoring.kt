package net.slingray.model

import kotlinx.serialization.KSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer

@Serializable
data class Scoring(
    @Serializable(with = FactionStringSerializer::class)
    val faction: Faction,
    @Serializable(with = ScoreSerializer::class)
    val scores: Map<Color, Int>
)

object ScoreSerializer : KSerializer<Map<Color, Int>> by MapSerializer(ColorStringSerializer, Int.serializer())
package net.slingray.model

import kotlinx.serialization.Serializable

@Serializable
data class Assignment(
    @Serializable(with = FactionObjectSerializer::class)
    val faction: Faction,
    @Serializable(with = ColorStringSerializer::class)
    val color: Color
)
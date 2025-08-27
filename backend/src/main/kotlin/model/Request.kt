package net.slingray.model

import kotlinx.serialization.KSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.descriptors.buildClassSerialDescriptor
import kotlinx.serialization.descriptors.element
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

@Serializable
data class Request(
    @Serializable(with = ExpansionStateSerializer::class)
    val expansionStates: Map<Expansion, Boolean>,
    val factions: List<Faction>,
    val excludedColors: List<ColorPair>,
    val scoring: List<Scoring>
)

object ExpansionStateSerializer : KSerializer<Map<Expansion, Boolean>> by MapSerializer(ExpansionStringSerializer, Boolean.serializer())

@Serializable(with = ColorPairSerializer::class)
data class ColorPair(
    val firstColor: Color,
    val secondColor: Color
)

object ColorPairSerializer : KSerializer<ColorPair> {
    override val descriptor = buildClassSerialDescriptor("ColorPair") {
        element<Color>("firstColor")
        element<Color>("secondColor")
    }

    override fun serialize(encoder: Encoder, value: ColorPair) {
        encoder.encodeString("${value.firstColor.color.lowercase()}-${value.secondColor.color.lowercase()}")
    }

    override fun deserialize(decoder: Decoder): ColorPair {
        val values = decoder.decodeString().split("-")

        if (values.size != 2) {
            throw IllegalArgumentException("Invalid color pair: $values")
        }

        val colors = values.map {
            Color.entries.firstOrNull { color ->
                color.color.lowercase() == it.lowercase()
            } ?: throw IllegalArgumentException("Unknown color: $it")
        }

        return ColorPair(colors.first(), colors.last())
    }
}
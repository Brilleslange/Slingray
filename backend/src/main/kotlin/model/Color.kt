package net.slingray.model

import kotlinx.serialization.KSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import net.slingray.model.Expansion.BASE
import net.slingray.model.Expansion.POK

@Serializable(with = ColorSerializer::class)
enum class Color(val value: String, val expansion: Expansion) {
    RED("red", BASE),
    ORANGE("orange", POK),
    YELLOW("yellow", BASE),
    GREEN("green", BASE),
    BLUE("blue", BASE),
    PURPLE("purple", BASE),
    PINK("pink", POK),
    BLACK("black", BASE)
}

object ColorSerializer : KSerializer<Color> {
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("Color", PrimitiveKind.STRING)

    override fun serialize(encoder: Encoder, value: Color) {
        encoder.encodeString(value.value)
    }

    override fun deserialize(decoder: Decoder): Color {
        val value = decoder.decodeString()
        return Color.entries.firstOrNull { it.value == value }
            ?: throw IllegalArgumentException("Unknown color: $value")
    }
}
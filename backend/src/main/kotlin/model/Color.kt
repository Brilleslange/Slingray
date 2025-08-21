package net.slingray.model

import kotlinx.serialization.KSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.descriptors.buildClassSerialDescriptor
import kotlinx.serialization.descriptors.element
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import net.slingray.model.Expansion.BASE
import net.slingray.model.Expansion.POK

@Serializable(with = ColorObjectSerializer::class)
enum class Color(val color: String, val expansion: Expansion) {
    RED("Red", BASE),
    ORANGE("Orange", POK),
    YELLOW("Yellow", BASE),
    GREEN("Green", BASE),
    BLUE("Blue", BASE),
    PURPLE("Purple", BASE),
    PINK("Pink", POK),
    BLACK("Black", BASE)
}

object ColorStringSerializer : KSerializer<Color> {
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("Color", PrimitiveKind.STRING)

    override fun serialize(encoder: Encoder, value: Color) {
        encoder.encodeString(value.color)
    }

    override fun deserialize(decoder: Decoder): Color {
        val value = decoder.decodeString()
        return Color.entries.firstOrNull { it.color.lowercase() == value.lowercase() }
            ?: throw IllegalArgumentException("Unknown color: $value")
    }
}

object ColorObjectSerializer : KSerializer<Color> {
    override val descriptor: SerialDescriptor = buildClassSerialDescriptor("Color") {
        element<String>("color")
        element<Expansion>("expansion")
    }

    override fun serialize(encoder: Encoder, value: Color) {
        val composite = encoder.beginStructure(descriptor)
        composite.encodeStringElement(descriptor, 0, value.color)
        composite.encodeSerializableElement(descriptor, 1, ExpansionSerializer, value.expansion)
        composite.endStructure(descriptor)
    }

    override fun deserialize(decoder: Decoder): Color {
        val value = decoder.decodeString()
        return Color.entries.firstOrNull { it.color.lowercase() == value.lowercase() }
            ?: throw IllegalArgumentException("Unknown color: $value")
    }
}
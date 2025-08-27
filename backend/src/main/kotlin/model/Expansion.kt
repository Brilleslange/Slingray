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

@Serializable(with = ExpansionObjectSerializer::class)
enum class Expansion(val long: String, val short: String) {
    BASE("Twilight Imperium", "base"),
    POK("Prophecy of Kings", "pok")
}

object ExpansionObjectSerializer : KSerializer<Expansion> {
    override val descriptor: SerialDescriptor = buildClassSerialDescriptor("Expansion") {
        element<String>("long")
        element<String>("short")
    }

    override fun serialize(encoder: Encoder, value: Expansion) {
        val composite = encoder.beginStructure(descriptor)
        composite.encodeStringElement(descriptor, 0, value.long)
        composite.encodeStringElement(descriptor, 1, value.short)
        composite.endStructure(descriptor)
    }

    override fun deserialize(decoder: Decoder): Expansion {
        val value = decoder.decodeString()
        return Expansion.entries.firstOrNull { it.short == value }
            ?: throw IllegalArgumentException("Unknown expansion: $value")
    }
}

object ExpansionStringSerializer : KSerializer<Expansion> {
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("Expansion", PrimitiveKind.STRING)

    override fun serialize(encoder: Encoder, value: Expansion) {
        encoder.encodeString(value.short)
    }

    override fun deserialize(decoder: Decoder): Expansion {
        val value = decoder.decodeString()
        return Expansion.entries.firstOrNull { it.short == value }
            ?: throw IllegalArgumentException("Unknown expansion: $value")
    }
}
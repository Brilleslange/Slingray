package net.slingray.model

import kotlinx.serialization.KSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

@Serializable(with = ExpansionSerializer::class)
enum class Expansion(val long: String, val short: String) {
    BASE("Twilight Imperium", "base"),
    POK("Prophecy of Kings", "pok")
}

object ExpansionSerializer : KSerializer<Expansion> {
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("Expansion", PrimitiveKind.STRING)

    override fun serialize(encoder: Encoder, value: Expansion) {
        encoder.encodeString(value.short)
    }

    override fun deserialize(decoder: Decoder): Expansion {
        return Expansion.entries.firstOrNull { it.short == decoder.decodeString() }
            ?: throw IllegalArgumentException("Unknown expansion: ${decoder.decodeString()}")
    }
}
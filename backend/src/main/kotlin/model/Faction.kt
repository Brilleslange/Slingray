package net.slingray.model

import kotlinx.serialization.KSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.descriptors.buildClassSerialDescriptor
import kotlinx.serialization.descriptors.element
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import kotlinx.serialization.json.JsonDecoder
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.jsonPrimitive
import net.slingray.model.Expansion.BASE
import net.slingray.model.Expansion.POK

@Serializable(with = FactionSerializer::class)
enum class Faction(val long: String, val short: String, val expansion: Expansion) : Comparable<Faction> {
    ARBOREC("The Arborec", "arborec", BASE),
    ARGENT("The Argent Flight", "argent", POK),
    BARONY("The Barony of Letnev", "barony", BASE),
    SAAR("The Clan of Saar", "saar", BASE),
    MUAAT("The Embers of Muaat", "muaat", BASE),
    HACAN("The Emirates of Hacan", "hacan", BASE),
    EMPYREAN("The Empyrean", "empyrean", POK),
    SOL("The Federation of Sol", "sol", BASE),
    GHOSTS("The Ghosts of Creuss", "ghosts", BASE),
    L1Z1X("The L1Z1X Mindnet", "l1z1x", BASE),
    MAHACT("The Mahact Gene-Sorcerers", "mahact", POK),
    MENTAK("The Mentak Coalition", "mentak", BASE),
    NAALU("The Naalu Collective", "naalu", BASE),
    NAAZ_ROKHA("The Naaz-Rokha Alliance", "naaz-rokha", POK),
    NEKRO("The Nekro Virus", "nekro", BASE),
    NOMAD("The Nomad", "nomad", POK),
    SARDAKK("Sardakk N'orr", "sardakk", BASE),
    TITANS("The Titans of Ul", "titans", POK),
    JOL_NAR("The Universities of Jol-Nar", "jol-nar", BASE),
    VUIL_RAITH("The Vuil'Raith Cabal", "vuil'raith", POK),
    WINNU("The Winnu", "winnu", BASE),
    XXCHA("The Xxcha Kingdom", "xxcha", BASE),
    YIN("The Yin Brotherhood", "yin", BASE),
    YSSARIL("The Yssaril Tribes", "yssaril", BASE)
}

val factionComparator = Comparator<Faction> { f1, f2 ->
    f1.long.removePrefix("The ").compareTo(
        f2.long.removePrefix("The ")
    )
}

object FactionSerializer : KSerializer<Faction> {
    override val descriptor: SerialDescriptor = buildClassSerialDescriptor("Faction") {
        element<String>("long")
        element<String>("short")
        element<Expansion>("expansion")
    }

    override fun serialize(encoder: Encoder, value: Faction) {
        val composite = encoder.beginStructure(descriptor)
        composite.encodeStringElement(descriptor, 0, value.long)
        composite.encodeStringElement(descriptor, 1, value.short)
        composite.encodeSerializableElement(descriptor, 2, ExpansionSerializer, value.expansion)
        composite.endStructure(descriptor)
    }

    override fun deserialize(decoder: Decoder): Faction {
        if (decoder is JsonDecoder) {
            val element = decoder.decodeJsonElement()
            return when (element) {
                is JsonPrimitive -> {
                    val value = element.content
                    Faction.entries.firstOrNull { it.long == value || it.short == value }
                        ?: throw IllegalArgumentException("Unknown faction: $value")
                }

                is JsonObject -> {
                    val longValue = element["long"]?.jsonPrimitive?.content
                    val shortValue = element["short"]?.jsonPrimitive?.content
                    Faction.entries.firstOrNull { it.long == longValue || it.short == shortValue }
                        ?: throw IllegalArgumentException("Unknown faction: $longValue")
                }

                else -> throw IllegalArgumentException("Invalid JSON for Faction: $element")
            }
        } else {
            throw IllegalStateException("FactionSerializer only works with JSON")
        }
    }
}
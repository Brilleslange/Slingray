import kotlinx.serialization.json.Json
import net.slingray.model.Color.*
import net.slingray.model.Faction.*
import net.slingray.model.Scores

fun main() {
    val scores = listOf(
        Scores(
            faction = ARBOREC,
            scores = mapOf(
                RED to 1,
                ORANGE to 2,
                YELLOW to 6,
                GREEN to 10,
                BLUE to 0,
                PURPLE to 1,
                PINK to 0,
                BLACK to 2
            )
        ),
        Scores(
            faction = ARGENT,
            scores = mapOf(
                RED to 2,
                ORANGE to 10,
                YELLOW to 2,
                GREEN to 7,
                BLUE to 2,
                PURPLE to 2,
                PINK to 0,
                BLACK to 1
            )
        ),
        Scores(
            faction = BARONY,
            scores = mapOf(
                RED to 8,
                ORANGE to 2,
                YELLOW to 0,
                GREEN to 1,
                BLUE to 4,
                PURPLE to 0,
                PINK to 0,
                BLACK to 9
            )
        ),
        Scores(
            faction = SAAR,
            scores = mapOf(
                RED to 1,
                ORANGE to 9,
                YELLOW to 8,
                GREEN to 1,
                BLUE to 0,
                PURPLE to 1,
                PINK to 0,
                BLACK to 2
            )
        ),
        Scores(
            faction = MUAAT,
            scores = mapOf(
                RED to 8,
                ORANGE to 9,
                YELLOW to 4,
                GREEN to 0,
                BLUE to 0,
                PURPLE to 0,
                PINK to 0,
                BLACK to 4
            )
        ),
        Scores(
            faction = HACAN,
            scores = mapOf(
                RED to 4,
                ORANGE to 8,
                YELLOW to 9,
                GREEN to 0,
                BLUE to 0,
                PURPLE to 0,
                PINK to 0,
                BLACK to 1
            )
        ),
        Scores(
            faction = EMPYREAN,
            scores = mapOf(
                RED to 7,
                ORANGE to 4,
                YELLOW to 1,
                GREEN to 0,
                BLUE to 2,
                PURPLE to 9,
                PINK to 3,
                BLACK to 5
            )
        ),
        Scores(
            faction = SOL,
            scores = mapOf(
                RED to 2,
                ORANGE to 0,
                YELLOW to 8,
                GREEN to 2,
                BLUE to 9,
                PURPLE to 0,
                PINK to 0,
                BLACK to 1
            )
        ),
        Scores(
            faction = GHOSTS,
            scores = mapOf(
                RED to 0,
                ORANGE to 1,
                YELLOW to 0,
                GREEN to 1,
                BLUE to 10,
                PURPLE to 2,
                PINK to 1,
                BLACK to 7
            )
        ),
        Scores(
            faction = L1Z1X,
            scores = mapOf(
                RED to 8,
                ORANGE to 1,
                YELLOW to 0,
                GREEN to 1,
                BLUE to 9,
                PURPLE to 0,
                PINK to 0,
                BLACK to 8
            )
        ),
        Scores(
            faction = MAHACT,
            scores = mapOf(
                RED to 1,
                ORANGE to 0,
                YELLOW to 10,
                GREEN to 0,
                BLUE to 0,
                PURPLE to 7,
                PINK to 2,
                BLACK to 1
            )
        ),
        Scores(
            faction = MENTAK,
            scores = mapOf(
                RED to 0,
                ORANGE to 9,
                YELLOW to 9,
                GREEN to 0,
                BLUE to 0,
                PURPLE to 4,
                PINK to 0,
                BLACK to 8
            )
        ),
        Scores(
            faction = NAALU,
            scores = mapOf(
                RED to 0,
                ORANGE to 9,
                YELLOW to 9,
                GREEN to 8,
                BLUE to 0,
                PURPLE to 1,
                PINK to 0,
                BLACK to 1
            )
        ),
        Scores(
            faction = NAAZ_ROKHA,
            scores = mapOf(
                RED to 1,
                ORANGE to 0,
                YELLOW to 7,
                GREEN to 10,
                BLUE to 0,
                PURPLE to 1,
                PINK to 0,
                BLACK to 2
            )
        ),
        Scores(
            faction = NEKRO,
            scores = mapOf(
                RED to 10,
                ORANGE to 1,
                YELLOW to 1,
                GREEN to 0,
                BLUE to 1,
                PURPLE to 1,
                PINK to 0,
                BLACK to 4
            )
        ),
        Scores(
            faction = NOMAD,
            scores = mapOf(
                RED to 1,
                ORANGE to 1,
                YELLOW to 2,
                GREEN to 1,
                BLUE to 8,
                PURPLE to 8,
                PINK to 7,
                BLACK to 4
            )
        ),
        Scores(
            faction = SARDAKK,
            scores = mapOf(
                RED to 9,
                ORANGE to 0,
                YELLOW to 2,
                GREEN to 4,
                BLUE to 0,
                PURPLE to 0,
                PINK to 0,
                BLACK to 8
            )
        ),
        Scores(
            faction = TITANS,
            scores = mapOf(
                RED to 0,
                ORANGE to 0,
                YELLOW to 1,
                GREEN to 1,
                BLUE to 1,
                PURPLE to 4,
                PINK to 10,
                BLACK to 1
            )
        ),
        Scores(
            faction = JOL_NAR,
            scores = mapOf(
                RED to 0,
                ORANGE to 0,
                YELLOW to 1,
                GREEN to 2,
                BLUE to 8,
                PURPLE to 9,
                PINK to 4,
                BLACK to 1
            )
        ),
        Scores(
            faction = VUIL_RAITH,
            scores = mapOf(
                RED to 10,
                ORANGE to 6,
                YELLOW to 1,
                GREEN to 0,
                BLUE to 0,
                PURPLE to 0,
                PINK to 0,
                BLACK to 6
            )
        ),
        Scores(
            faction = WINNU,
            scores = mapOf(
                RED to 6,
                ORANGE to 8,
                YELLOW to 8,
                GREEN to 2,
                BLUE to 0,
                PURPLE to 9,
                PINK to 1,
                BLACK to 1
            )
        ),
        Scores(
            faction = XXCHA,
            scores = mapOf(
                RED to 0,
                ORANGE to 1,
                YELLOW to 4,
                GREEN to 10,
                BLUE to 6,
                PURPLE to 1,
                PINK to 0,
                BLACK to 2
            )
        ),
        Scores(
            faction = YIN,
            scores = mapOf(
                RED to 0,
                ORANGE to 1,
                YELLOW to 7,
                GREEN to 0,
                BLUE to 0,
                PURPLE to 8,
                PINK to 4,
                BLACK to 5
            )
        ),
        Scores(
            faction = YSSARIL,
            scores = mapOf(
                RED to 7,
                ORANGE to 1,
                YELLOW to 8,
                GREEN to 9,
                BLUE to 0,
                PURPLE to 2,
                PINK to 0,
                BLACK to 6
            )
        )
    )

    val json = Json.encodeToString(scores)

    println(json)
}
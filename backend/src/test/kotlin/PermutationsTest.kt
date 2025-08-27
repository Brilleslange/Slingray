import net.slingray.model.Color
import net.slingray.services.permutations
import kotlin.test.Test
import kotlin.test.assertEquals

class PermutationsTest {
    @Test
    fun `Correctly calculates permutations`() {
        val expected = setOf(
            listOf(Color.RED, Color.GREEN),
            listOf(Color.RED, Color.BLUE),
            listOf(Color.BLUE, Color.RED),
            listOf(Color.BLUE, Color.GREEN),
            listOf(Color.GREEN, Color.RED),
            listOf(Color.GREEN, Color.BLUE)
        )

        val actual = permutations(listOf(Color.RED, Color.GREEN, Color.BLUE), 2)

        assertEquals(expected, actual)
    }
}
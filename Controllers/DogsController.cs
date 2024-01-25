using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class DogsController : ControllerBase
{
    private static List<Dog> dogs = new List<Dog>();

    // Hämta alla hundar
    [HttpGet]
    public ActionResult<IEnumerable<Dog>> GetAllDogs()
    {
        return Ok(dogs);
    }

    // Hämta en viss hund
    [HttpGet("{id}")]
    public ActionResult<Dog> GetDogById(int id)
    {
        var dog = dogs.Find(d => d.Id == id);
        if (dog == null)
        {
            return NotFound();
        }

        return Ok(dog);
    }

    // Ta bort en hund
    [HttpDelete("{id}")]
    public ActionResult<string> DeleteDogById(int id)
    {
        var dog = dogs.Find(d => d.Id == id);
        if (dog == null)
        {
            return NotFound();
        }

        dogs.Remove(dog);
        return Ok("Dog deleted");
    }

    // Lägg till en ny hund
    [HttpPost]
    public ActionResult<Dog> AddDog([FromBody] Dog newDog)
    {
        newDog.Id = dogs.Count + 1;
        dogs.Add(newDog);

        return CreatedAtAction(nameof(GetDogById), new { id = newDog.Id }, newDog);
    }
}

public class Dog
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
}

// Controllers/ScoresController.cs
using beckendSnake.Data;
using beckendSnake.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")] 
[ApiController]
public class ScoresController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public ScoresController(ApplicationDbContext context)
  {
    _context = context;
  }

  // Aceasta metoda raspunde la POST https://localhost:7277/api/scores
  [HttpPost]
  public async Task<ActionResult<Score>> PostScore(Score score)
  {
   
    score.Timestamp = DateTime.UtcNow;
    _context.Scores.Add(score);
    await _context.SaveChangesAsync();
    return CreatedAtAction(nameof(GetScore), new { id = score.Id }, score);
  }

  // Aceasta metoda raspunde la GET https://localhost:7277/api/scores/highscores
  [HttpGet("highscores")] // Aceasta linie este highscores
  public async Task<ActionResult<IEnumerable<Score>>> GetHighScores()
  {
    
    var highScores = await _context.Scores
                                   .OrderByDescending(s => s.score)
                                   .Take(10)
                                   .ToListAsync();
    return Ok(highScores);
  }

  
  [HttpGet("{id}")]
  public async Task<ActionResult<Score>> GetScore(int id)
  {
    
    var score = await _context.Scores.FindAsync(id);
    if (score == null) { return NotFound(); }
    return score;
  }
}

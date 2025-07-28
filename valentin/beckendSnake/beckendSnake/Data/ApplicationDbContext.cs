namespace beckendSnake.Data;
using beckendSnake.Models;
using Microsoft.EntityFrameworkCore;

  public class ApplicationDbContext : DbContext
  {
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

  public DbSet<Score> Scores { get; set; }

  }


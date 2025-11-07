using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace beckendSnake.Migrations
{
    /// <inheritdoc />
    public partial class UpdateScoreColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Value",
                table: "Scores",
                newName: "score");

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Scores",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "score",
                table: "Scores",
                newName: "Value");

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Scores",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}

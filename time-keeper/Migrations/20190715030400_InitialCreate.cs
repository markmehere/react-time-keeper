using Microsoft.EntityFrameworkCore.Migrations;

namespace timekeeper.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HoldingUser",
                columns: table => new
                {
                    holder = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoldingUser", x => x.holder);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HoldingUser");
        }
    }
}

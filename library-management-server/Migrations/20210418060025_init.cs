using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace R5.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Author",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Author", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Book",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuthorId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    ImgCover = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Book", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Book_Author_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Author",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Book_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Order_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderDetail",
                columns: table => new
                {
                    BookId = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    ItemQuantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetail", x => new { x.OrderId, x.BookId });
                    table.ForeignKey(
                        name: "FK_OrderDetail_Book_BookId",
                        column: x => x.BookId,
                        principalTable: "Book",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDetail_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Author",
                columns: new[] { "Id", "CreatedDate", "ModifiedDate", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(8760), null, "Huan" },
                    { 2, new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(8767), null, "Duy" },
                    { 3, new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(8770), null, "Bui" }
                });

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "Id", "CreatedDate", "ModifiedDate", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(3643), null, "Comic" },
                    { 2, new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(4138), null, "Anime" },
                    { 3, new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(4143), null, "Fiction" }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "CreatedDate", "ModifiedDate", "Password", "Role", "UserName" },
                values: new object[,]
                {
                    { 1, new DateTime(2021, 4, 18, 13, 0, 25, 374, DateTimeKind.Local).AddTicks(1876), null, "123", "admin", "admin" },
                    { 2, new DateTime(2021, 4, 18, 13, 0, 25, 375, DateTimeKind.Local).AddTicks(1212), null, "123", "user", "user1" },
                    { 3, new DateTime(2021, 4, 18, 13, 0, 25, 375, DateTimeKind.Local).AddTicks(1231), null, "123", "user", "user2" }
                });

            migrationBuilder.InsertData(
                table: "Book",
                columns: new[] { "Id", "AuthorId", "CategoryId", "CreatedDate", "ImgCover", "ModifiedDate", "Quantity", "Title" },
                values: new object[,]
                {
                    { 1, 3, 1, new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(6853), "https://firstnews.com.vn/public/uploads/products/dac-nhan-tam-biamem2019-76k-bia1.jpg", null, 10, "Conan" },
                    { 2, 1, 2, new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(7684), "https://firstnews.com.vn/public/uploads/products/dac-nhan-tam-biamem2019-76k-bia1.jpg", null, 10, "Doremon" },
                    { 3, 2, 3, new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(7691), "https://firstnews.com.vn/public/uploads/products/dac-nhan-tam-biamem2019-76k-bia1.jpg", null, 10, "Dragon Balls" }
                });

            migrationBuilder.InsertData(
                table: "Order",
                columns: new[] { "Id", "CreatedDate", "ModifiedDate", "Status", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2021, 4, 18, 13, 0, 25, 377, DateTimeKind.Local).AddTicks(263), null, "waiting", 1 },
                    { 2, new DateTime(2021, 4, 18, 13, 0, 25, 377, DateTimeKind.Local).AddTicks(271), null, "waiting", 1 },
                    { 3, new DateTime(2021, 4, 18, 13, 0, 25, 377, DateTimeKind.Local).AddTicks(273), null, "waiting", 2 }
                });

            migrationBuilder.InsertData(
                table: "OrderDetail",
                columns: new[] { "BookId", "OrderId", "ItemQuantity" },
                values: new object[] { 1, 1, 1 });

            migrationBuilder.InsertData(
                table: "OrderDetail",
                columns: new[] { "BookId", "OrderId", "ItemQuantity" },
                values: new object[] { 2, 2, 1 });

            migrationBuilder.InsertData(
                table: "OrderDetail",
                columns: new[] { "BookId", "OrderId", "ItemQuantity" },
                values: new object[] { 3, 3, 3 });

            migrationBuilder.CreateIndex(
                name: "IX_Book_AuthorId",
                table: "Book",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Book_CategoryId",
                table: "Book",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Order_UserId",
                table: "Order",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetail_BookId",
                table: "OrderDetail",
                column: "BookId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderDetail");

            migrationBuilder.DropTable(
                name: "Book");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "Author");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}

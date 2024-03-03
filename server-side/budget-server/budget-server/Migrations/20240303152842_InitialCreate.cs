using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace budget_server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Budget",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IncomePay = table.Column<double>(type: "float", nullable: false),
                    IncomeBenefits = table.Column<double>(type: "float", nullable: false),
                    IncomePension = table.Column<double>(type: "float", nullable: false),
                    IncomeOther = table.Column<double>(type: "float", nullable: false),
                    PaymentMortgage = table.Column<double>(type: "float", nullable: false),
                    PaymentRent = table.Column<double>(type: "float", nullable: false),
                    PaymentHomeInsurance = table.Column<double>(type: "float", nullable: false),
                    PaymentHouseTax = table.Column<double>(type: "float", nullable: false),
                    PaymentHouseGas = table.Column<double>(type: "float", nullable: false),
                    PaymentElectricity = table.Column<double>(type: "float", nullable: false),
                    PaymentWater = table.Column<double>(type: "float", nullable: false),
                    PaymentHomePhone = table.Column<double>(type: "float", nullable: false),
                    PaymentMobilePhone = table.Column<double>(type: "float", nullable: false),
                    PaymentBroadband = table.Column<double>(type: "float", nullable: false),
                    PaymentTvLicense = table.Column<double>(type: "float", nullable: false),
                    PaymentHomeMaintenance = table.Column<double>(type: "float", nullable: false),
                    PaymentGroceries = table.Column<double>(type: "float", nullable: false),
                    PaymentTakeaways = table.Column<double>(type: "float", nullable: false),
                    PaymentCigarettes = table.Column<double>(type: "float", nullable: false),
                    PaymentEatingOut = table.Column<double>(type: "float", nullable: false),
                    PaymentClothing = table.Column<double>(type: "float", nullable: false),
                    PaymentChildcare = table.Column<double>(type: "float", nullable: false),
                    PaymentHealthandBeauty = table.Column<double>(type: "float", nullable: false),
                    PaymentEyeCare = table.Column<double>(type: "float", nullable: false),
                    PaymentDentalCare = table.Column<double>(type: "float", nullable: false),
                    PaymentMedicine = table.Column<double>(type: "float", nullable: false),
                    PaymentActivities = table.Column<double>(type: "float", nullable: false),
                    PaymentPocketMoney = table.Column<double>(type: "float", nullable: false),
                    PaymentChildSupport = table.Column<double>(type: "float", nullable: false),
                    PaymentSchoolFees = table.Column<double>(type: "float", nullable: false),
                    PaymentPetFood = table.Column<double>(type: "float", nullable: false),
                    PaymentVetBills = table.Column<double>(type: "float", nullable: false),
                    PaymentLifeInsurance = table.Column<double>(type: "float", nullable: false),
                    PaymentHealthInsurance = table.Column<double>(type: "float", nullable: false),
                    PaymentDentalInsurance = table.Column<double>(type: "float", nullable: false),
                    PaymentPetInsurance = table.Column<double>(type: "float", nullable: false),
                    PaymentCarInsurance = table.Column<double>(type: "float", nullable: false),
                    PaymentBankFees = table.Column<double>(type: "float", nullable: false),
                    PaymentLoan = table.Column<double>(type: "float", nullable: false),
                    PaymentCreditCard = table.Column<double>(type: "float", nullable: false),
                    PaymentHirePurchases = table.Column<double>(type: "float", nullable: false),
                    PaymentInvestments = table.Column<double>(type: "float", nullable: false),
                    PaymentPension = table.Column<double>(type: "float", nullable: false),
                    PaymentCarFuel = table.Column<double>(type: "float", nullable: false),
                    PaymentCarTax = table.Column<double>(type: "float", nullable: false),
                    PaymentCarMaintenance = table.Column<double>(type: "float", nullable: false),
                    PaymentPublicTransport = table.Column<double>(type: "float", nullable: false),
                    PaymentGym = table.Column<double>(type: "float", nullable: false),
                    PaymentStreamingServices = table.Column<double>(type: "float", nullable: false),
                    PaymentHolidays = table.Column<double>(type: "float", nullable: false),
                    PaymentOther = table.Column<double>(type: "float", nullable: false),
                    IncomeTotal = table.Column<double>(type: "float", nullable: false),
                    PaymentTotal = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_Budget", x => x.UserId);
                    table.ForeignKey(
                        "FK_Budget",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Budget");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}

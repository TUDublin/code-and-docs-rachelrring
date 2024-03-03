﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using budget_server.Data;

#nullable disable

namespace budget_server.Migrations
{
    [DbContext(typeof(budget_serverContext))]
    partial class budget_serverContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("budget_server.Budget", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("IncomeBenefits")
                        .HasColumnType("float");

                    b.Property<double>("IncomeOther")
                        .HasColumnType("float");

                    b.Property<double>("IncomePay")
                        .HasColumnType("float");

                    b.Property<double>("IncomePension")
                        .HasColumnType("float");

                    b.Property<double>("IncomeTotal")
                        .HasColumnType("float");

                    b.Property<double>("PaymentActivities")
                        .HasColumnType("float");

                    b.Property<double>("PaymentBankFees")
                        .HasColumnType("float");

                    b.Property<double>("PaymentBroadband")
                        .HasColumnType("float");

                    b.Property<double>("PaymentCarFuel")
                        .HasColumnType("float");

                    b.Property<double>("PaymentCarInsurance")
                        .HasColumnType("float");

                    b.Property<double>("PaymentCarMaintenance")
                        .HasColumnType("float");

                    b.Property<double>("PaymentCarTax")
                        .HasColumnType("float");

                    b.Property<double>("PaymentChildSupport")
                        .HasColumnType("float");

                    b.Property<double>("PaymentChildcare")
                        .HasColumnType("float");

                    b.Property<double>("PaymentCigarettes")
                        .HasColumnType("float");

                    b.Property<double>("PaymentClothing")
                        .HasColumnType("float");

                    b.Property<double>("PaymentCreditCard")
                        .HasColumnType("float");

                    b.Property<double>("PaymentDentalCare")
                        .HasColumnType("float");

                    b.Property<double>("PaymentDentalInsurance")
                        .HasColumnType("float");

                    b.Property<double>("PaymentEatingOut")
                        .HasColumnType("float");

                    b.Property<double>("PaymentElectricity")
                        .HasColumnType("float");

                    b.Property<double>("PaymentEyeCare")
                        .HasColumnType("float");

                    b.Property<double>("PaymentGroceries")
                        .HasColumnType("float");

                    b.Property<double>("PaymentGym")
                        .HasColumnType("float");

                    b.Property<double>("PaymentHealthInsurance")
                        .HasColumnType("float");

                    b.Property<double>("PaymentHealthandBeauty")
                        .HasColumnType("float");

                    b.Property<double>("PaymentHirePurchases")
                        .HasColumnType("float");

                    b.Property<double>("PaymentHolidays")
                        .HasColumnType("float");

                    b.Property<double>("PaymentHomeInsurance")
                        .HasColumnType("float");

                    b.Property<double>("PaymentHomeMaintenance")
                        .HasColumnType("float");

                    b.Property<double>("PaymentHomePhone")
                        .HasColumnType("float");

                    b.Property<double>("PaymentHouseGas")
                        .HasColumnType("float");

                    b.Property<double>("PaymentHouseTax")
                        .HasColumnType("float");

                    b.Property<double>("PaymentInvestments")
                        .HasColumnType("float");

                    b.Property<double>("PaymentLifeInsurance")
                        .HasColumnType("float");

                    b.Property<double>("PaymentLoan")
                        .HasColumnType("float");

                    b.Property<double>("PaymentMedicine")
                        .HasColumnType("float");

                    b.Property<double>("PaymentMobilePhone")
                        .HasColumnType("float");

                    b.Property<double>("PaymentMortgage")
                        .HasColumnType("float");

                    b.Property<double>("PaymentOther")
                        .HasColumnType("float");

                    b.Property<double>("PaymentPension")
                        .HasColumnType("float");

                    b.Property<double>("PaymentPetFood")
                        .HasColumnType("float");

                    b.Property<double>("PaymentPetInsurance")
                        .HasColumnType("float");

                    b.Property<double>("PaymentPocketMoney")
                        .HasColumnType("float");

                    b.Property<double>("PaymentPublicTransport")
                        .HasColumnType("float");

                    b.Property<double>("PaymentRent")
                        .HasColumnType("float");

                    b.Property<double>("PaymentSchoolFees")
                        .HasColumnType("float");

                    b.Property<double>("PaymentStreamingServices")
                        .HasColumnType("float");

                    b.Property<double>("PaymentTakeaways")
                        .HasColumnType("float");

                    b.Property<double>("PaymentTotal")
                        .HasColumnType("float");

                    b.Property<double>("PaymentTvLicense")
                        .HasColumnType("float");

                    b.Property<double>("PaymentVetBills")
                        .HasColumnType("float");

                    b.Property<double>("PaymentWater")
                        .HasColumnType("float");

                    b.HasKey("UserId");

                    b.ToTable("Budget");
                });

            modelBuilder.Entity("budget_server.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("budget_server.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("budget_server.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("budget_server.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("budget_server.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}

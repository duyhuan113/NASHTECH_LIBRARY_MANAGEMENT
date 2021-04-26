﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using R5.Data;

namespace R5.Migrations
{
    [DbContext(typeof(F5DbContext))]
    [Migration("20210418060025_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.5")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("R5.Models.Author", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Author");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedDate = new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(8760),
                            Name = "Huan"
                        },
                        new
                        {
                            Id = 2,
                            CreatedDate = new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(8767),
                            Name = "Duy"
                        },
                        new
                        {
                            Id = 3,
                            CreatedDate = new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(8770),
                            Name = "Bui"
                        });
                });

            modelBuilder.Entity("R5.Models.Book", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AuthorId")
                        .HasColumnType("int");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ImgCover")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Book");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AuthorId = 3,
                            CategoryId = 1,
                            CreatedDate = new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(6853),
                            ImgCover = "https://firstnews.com.vn/public/uploads/products/dac-nhan-tam-biamem2019-76k-bia1.jpg",
                            Quantity = 10,
                            Title = "Conan"
                        },
                        new
                        {
                            Id = 2,
                            AuthorId = 1,
                            CategoryId = 2,
                            CreatedDate = new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(7684),
                            ImgCover = "https://firstnews.com.vn/public/uploads/products/dac-nhan-tam-biamem2019-76k-bia1.jpg",
                            Quantity = 10,
                            Title = "Doremon"
                        },
                        new
                        {
                            Id = 3,
                            AuthorId = 2,
                            CategoryId = 3,
                            CreatedDate = new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(7691),
                            ImgCover = "https://firstnews.com.vn/public/uploads/products/dac-nhan-tam-biamem2019-76k-bia1.jpg",
                            Quantity = 10,
                            Title = "Dragon Balls"
                        });
                });

            modelBuilder.Entity("R5.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Category");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedDate = new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(3643),
                            Name = "Comic"
                        },
                        new
                        {
                            Id = 2,
                            CreatedDate = new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(4138),
                            Name = "Anime"
                        },
                        new
                        {
                            Id = 3,
                            CreatedDate = new DateTime(2021, 4, 18, 13, 0, 25, 376, DateTimeKind.Local).AddTicks(4143),
                            Name = "Fiction"
                        });
                });

            modelBuilder.Entity("R5.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Order");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedDate = new DateTime(2021, 4, 18, 13, 0, 25, 377, DateTimeKind.Local).AddTicks(263),
                            Status = "waiting",
                            UserId = 1
                        },
                        new
                        {
                            Id = 2,
                            CreatedDate = new DateTime(2021, 4, 18, 13, 0, 25, 377, DateTimeKind.Local).AddTicks(271),
                            Status = "waiting",
                            UserId = 1
                        },
                        new
                        {
                            Id = 3,
                            CreatedDate = new DateTime(2021, 4, 18, 13, 0, 25, 377, DateTimeKind.Local).AddTicks(273),
                            Status = "waiting",
                            UserId = 2
                        });
                });

            modelBuilder.Entity("R5.Models.OrderDetail", b =>
                {
                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.Property<int>("BookId")
                        .HasColumnType("int");

                    b.Property<int>("ItemQuantity")
                        .HasColumnType("int");

                    b.HasKey("OrderId", "BookId");

                    b.HasIndex("BookId");

                    b.ToTable("OrderDetail");

                    b.HasData(
                        new
                        {
                            OrderId = 1,
                            BookId = 1,
                            ItemQuantity = 1
                        },
                        new
                        {
                            OrderId = 2,
                            BookId = 2,
                            ItemQuantity = 1
                        },
                        new
                        {
                            OrderId = 3,
                            BookId = 3,
                            ItemQuantity = 3
                        });
                });

            modelBuilder.Entity("R5.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("User");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedDate = new DateTime(2021, 4, 18, 13, 0, 25, 374, DateTimeKind.Local).AddTicks(1876),
                            Password = "123",
                            Role = "admin",
                            UserName = "admin"
                        },
                        new
                        {
                            Id = 2,
                            CreatedDate = new DateTime(2021, 4, 18, 13, 0, 25, 375, DateTimeKind.Local).AddTicks(1212),
                            Password = "123",
                            Role = "user",
                            UserName = "user1"
                        },
                        new
                        {
                            Id = 3,
                            CreatedDate = new DateTime(2021, 4, 18, 13, 0, 25, 375, DateTimeKind.Local).AddTicks(1231),
                            Password = "123",
                            Role = "user",
                            UserName = "user2"
                        });
                });

            modelBuilder.Entity("R5.Models.Book", b =>
                {
                    b.HasOne("R5.Models.Author", "Author")
                        .WithMany("Books")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("R5.Models.Category", "Category")
                        .WithMany("Books")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("R5.Models.Order", b =>
                {
                    b.HasOne("R5.Models.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("R5.Models.OrderDetail", b =>
                {
                    b.HasOne("R5.Models.Book", "Book")
                        .WithMany("OrderDetails")
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("R5.Models.Order", "Order")
                        .WithMany("OrderDetails")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Book");

                    b.Navigation("Order");
                });

            modelBuilder.Entity("R5.Models.Author", b =>
                {
                    b.Navigation("Books");
                });

            modelBuilder.Entity("R5.Models.Book", b =>
                {
                    b.Navigation("OrderDetails");
                });

            modelBuilder.Entity("R5.Models.Category", b =>
                {
                    b.Navigation("Books");
                });

            modelBuilder.Entity("R5.Models.Order", b =>
                {
                    b.Navigation("OrderDetails");
                });

            modelBuilder.Entity("R5.Models.User", b =>
                {
                    b.Navigation("Orders");
                });
#pragma warning restore 612, 618
        }
    }
}

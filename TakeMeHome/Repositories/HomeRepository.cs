using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using TakeMeHome.Models;
using TakeMeHome.Utils;
using Microsoft.Data.SqlClient;
using TakeMeHome.Repositories;

namespace TakeMeHome.Repositories
{
    public class HomeRepository : BaseRepository, IHomeRepository
    {
        public HomeRepository(IConfiguration configuration) : base(configuration) { }

        public Home GetHomeWithInventoryandUpkeep(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
         SELECT h.Id, h.FirstName, h.LastName, h.Email, h.ConstructedDate,
                  hi.Id, hi.HomeId, hi.InventoryId as HomeInventoryId, hi.Brand, hi.ModelNumber, hi.PurchaseDate,
                  i.Id as PrimaryInventoryId, i.Name, i.AreaId,
                  u.Id as UpkeepId, u.InventoryId, u.Title, u.NumberOfMonths, u.Description,
                  a.Name as InventoryAreaName, a.Id as InventoryAreaId
                          FROM Home h
                       LEFT JOIN HomeInventory hi ON hi.HomeId = h.id
                       LEFT JOIN Inventory i on hi.InventoryId = i.id
                       LEFT JOIN Upkeep u ON u.InventoryId = u.id
                       LEFT JOIN Area a ON a.id = i.AreaId
                         WHERE h.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Home home = null;
                    var inventory = new List<HomeInventory>();
                    while (reader.Read())
                    {
                        if (home == null)

                        {
                            home = new Home()
                            {


                                Id = DbUtils.GetInt(reader, "Id"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ConstructedDate = DbUtils.GetDateTime(reader, "ConstructedDate"),

                                Inventory = inventory

                            };

                        }

                        var inventoryId = DbUtils.GetInt(reader, "PrimaryInventoryId");

                        if (DbUtils.IsNotDbNull(reader, "PrimaryInventoryId") && !inventory.Contains(inventory.FirstOrDefault(i => i.Id == inventoryId)))
                        {

                            home.Inventory.Add(new HomeInventory()
                            {
                                Id = DbUtils.GetInt(reader, "HomeInventoryId"),
                                Brand = DbUtils.GetString(reader, "Brand"),
                                ModelNumber = DbUtils.GetString(reader, "ModelNumber"),
                                PurchaseDate = DbUtils.GetDateTime(reader, "PurchaseDate"),
                                HomeId = DbUtils.GetInt(reader, "HomeId"),
                                InventoryId = DbUtils.GetInt(reader, "PrimaryInventoryId"),
                                Inventory = new Inventory()
                                {
                                    Id = DbUtils.GetInt(reader, "PrimaryInventoryId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    AreaId = DbUtils.GetInt(reader, "AreaId"),
                                    Area = new Area()
                                    {
                                        Id = DbUtils.GetInt(reader, "InventoryAreaId"),
                                        Name = DbUtils.GetString(reader, "InventoryAreaName")
                                    }
                                },
                                Upkeeps = new List<Upkeep>()
                            }) ;


                        }

              /*          foreach (var item in inventory)
                        {


                            if (DbUtils.IsNotDbNull(reader, "UpkeepId") && item.Id == inventoryId)
                            {
                                item.UpKeeps.Add(new Upkeep()
                                {
                                    Id = DbUtils.GetInt(reader, "UpkeepId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    NumberOfMonths = DbUtils.GetInt(reader, "NumberOfMonths"),
                                    InventoryId = inventoryId,
                                    Inventory = new Inventory()
                                    {
                                        Id = DbUtils.GetInt(reader, "PrimaryInventoryId"),
                                        Name = DbUtils.GetString(reader, "Name"),
                                        AreaId = DbUtils.GetInt(reader, "InventoryAreaId"),
                                        Area = new Area()
                                        {
                                            Id = DbUtils.GetInt(reader, "InventoryAreaId"),
                                            Name = DbUtils.GetString(reader, "InventoryAreaName")
                                        }
                                    }
                                });
                            }

                        }*/

                    }

                    reader.Close();

                    return home;
                }
            }

        }
        public Home GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirstName, LastName, Email, ConstructedDate
                          FROM Home
                         WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    Home home = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        home = NewHomeFromReader(reader);
                    }
                    reader.Close();

                    return home;
                }
            }
        }

        public void Add(Home home)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Home (FirstName, LastName, Email, ConstructedDate)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirstName, @LastName, @Email, 
                                                @ConstructedDate)";
                    DbUtils.AddParameter(cmd, "@FirstName", home.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", home.LastName);
                    DbUtils.AddParameter(cmd, "@Email", home.Email);
                    DbUtils.AddParameter(cmd, "@ConstructedDate", home.ConstructedDate);

                    home.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        private Home NewHomeFromReader(SqlDataReader reader)
        {
            return new Home()
            {

                Id = DbUtils.GetInt(reader, "Id"),
                FirstName = DbUtils.GetString(reader, "FirstName"),
                LastName = DbUtils.GetString(reader, "LastName"),
                Email = DbUtils.GetString(reader, "Email"),
                ConstructedDate = DbUtils.GetDateTime(reader, "ConstructedDate"),              
            };
        }

    }
}


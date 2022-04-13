using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using TakeMeHome.Models;
using TakeMeHome.Utils;

namespace TakeMeHome.Repositories
{
    public class HomeInventoryRepository : BaseRepository, IHomeInventoryRepository
    {
        public HomeInventoryRepository(IConfiguration configuration) : base(configuration) { }



        public void Add(HomeInventory inventory)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Upkeep
                        Where InventoryId = @InventoryId;
                       ";

                    cmd.Parameters.AddWithValue("@InventoryId", inventory.InventoryId);
                    var reader = cmd.ExecuteReader();

                    var upkeeps = new List<Upkeep>();
                    while (reader.Read())
                    {
                        upkeeps.Add(new Upkeep()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            NumberOfMonths = DbUtils.GetInt(reader, "NumberOfMonths"),
                            InventoryId = DbUtils.GetInt(reader, "InventoryId")
                        });
                    }

                    reader.Close();
                    string upKeepInsertStatement = "";
                 
                    foreach (Upkeep singleUpkeep in upkeeps)
                    {
                        DateTime today = DateTime.Now;
                        DateTime scheduleDate = today.AddMonths(singleUpkeep.NumberOfMonths);

                        upKeepInsertStatement += $@"INSERT INTO HomeUpkeep (UpkeepId, HomeId, ScheduleDate, Count) VALUES ({singleUpkeep.Id}, {inventory.HomeId}, '{scheduleDate}',0 ); ";
                        Console.WriteLine("");

                    }
                        upKeepInsertStatement += @"INSERT INTO HomeInventory(HomeId, InventoryId, Brand, ModelNumber, PurchaseDate)
                         VALUES (@HomeId, @InventoryId, @Brand, @ModelNumber, @PurchaseDate)";

                    cmd.CommandText = upKeepInsertStatement;

                    cmd.Parameters.AddWithValue("@HomeId", inventory.HomeId);
                    cmd.Parameters.AddWithValue("@Brand", DbUtils.ValueOrDBNull(inventory.Brand));
                    cmd.Parameters.AddWithValue("@ModelNumber", DbUtils.ValueOrDBNull(inventory.ModelNumber));
                    cmd.Parameters.AddWithValue("@PurchaseDate", DbUtils.ValueOrDBNull(inventory.PurchaseDate));

                    cmd.ExecuteNonQuery();
                }
        }
        }
        public void UpdateInventory(HomeInventory inventory, int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE HomeInventory
                            SET 
                               [Brand] = @brand, 
                               [ModelNumber] = @modelNumber,
                               [PurchaseDate] = @purchaseDate, 
                               [HomeId] = @homeId, 
                               [InventoryId] = @inventoryId 

                               WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@brand", inventory.Brand);
                    cmd.Parameters.AddWithValue("@modelNumber", inventory.ModelNumber);
                    cmd.Parameters.AddWithValue("@purchaseDate", inventory.PurchaseDate);
                    cmd.Parameters.AddWithValue("@homeId", inventory.HomeId);
                    cmd.Parameters.AddWithValue("@inventoryId", inventory.InventoryId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public HomeInventory GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT hi.Id, hi.Homeid, hi.InventoryId, hi.Brand, hi.ModelNumber, hi.PurchaseDate,
                               i.Name as InventoryName, i.Id as PrimaryInventoryId, u.Title, u.NumberOfMonths, u.Id as UpkeepId
                                        FROM Inventory i
                                        Left Join HomeInventory hi On i.Id = hi.InventoryId
                                        Left Join Upkeep u On u.InventoryId = i.Id
                           WHERE i.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    HomeInventory inventory = null;
                    while (reader.Read())
                    {
                        if(inventory == null)
                        {
                            inventory = new HomeInventory()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                HomeId = DbUtils.GetInt(reader, "HomeId"),
                                Brand = DbUtils.GetString(reader, "Brand"),
                                ModelNumber = DbUtils.GetString(reader, "ModelNumber"),
                                PurchaseDate = DbUtils.GetDateTime(reader, "PurchaseDate"),
                                InventoryId = DbUtils.GetInt(reader, "InventoryId"),
                                Inventory = new Inventory()
                                {
                                    Id = DbUtils.GetInt(reader, "PrimaryInventoryId"),
                                    Name = DbUtils.GetString(reader, "InventoryName")
                                },
                                Upkeeps = new List<Upkeep>()

                            };
                        }
                       
                        if (DbUtils.IsNotDbNull(reader, "UpkeepId"))
                        {
                            inventory.Upkeeps.Add(new Upkeep()
                            {
                                Id = DbUtils.GetInt(reader, "UpkeepId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                NumberOfMonths = DbUtils.GetInt(reader, "NumberOfMonths")
                            });

                        }
                    }
                    reader.Close();

                    return inventory;
                }
            }

        }
        private HomeInventory NewInventoryFromReader(SqlDataReader reader)
        {
            return new HomeInventory()
            {

                Id = DbUtils.GetInt(reader, "Id"),
                Brand = DbUtils.GetString(reader, "FirstName"),
                ModelNumber = DbUtils.GetString(reader, "LastName"),
                PurchaseDate = DbUtils.GetDateTime(reader, "ConstructedDate"),
                HomeId = DbUtils.GetInt(reader, "HomeId"),
                Home = new Home()
                {
                    Id = DbUtils.GetInt(reader, "Id"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    ConstructedDate = DbUtils.GetDateTime(reader, "ConstructedDate"),
                },
                InventoryId = DbUtils.GetInt(reader,"InventoryId"),
                Inventory = new Inventory()
                {
                    Id = DbUtils.GetInt(reader, "InventoryId"),
                    Name = DbUtils.GetString(reader, "Name"),
                    AreaId = DbUtils.GetInt(reader, "AreaId"),
                    Area = new Area()
                    {
                        Id = DbUtils.GetInt(reader,"AreaId"),
                        Name = DbUtils.GetString(reader, "AreaName")
                    }
                }
            };
        }
    }
}

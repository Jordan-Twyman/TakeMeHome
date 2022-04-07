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
        /* INSERT INTO HomeInventory(HomeId, InventoryId, Brand, ModelNumber, PurchaseDate)
                         OUTPUT INSERTED.ID
                         VALUES (@HomeId, @InventoryId, @Brand, @ModelNumber, @PurchaseDate)*/
       /* cmd.Parameters.AddWithValue("@HomeId", inventory.HomeId);
                    cmd.Parameters.AddWithValue("@Brand", DbUtils.ValueOrDBNull(inventory.Brand));
                    cmd.Parameters.AddWithValue("@ModelNumber", DbUtils.ValueOrDBNull(inventory.ModelNumber));
                    cmd.Parameters.AddWithValue("@PurchaseDate", DbUtils.ValueOrDBNull(inventory.PurchaseDate));

                    inventory.Id = (int) cmd.ExecuteScalar();*/
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

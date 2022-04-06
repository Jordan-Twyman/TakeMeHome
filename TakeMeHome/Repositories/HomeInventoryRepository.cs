using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
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
                        INSERT INTO HomeInventory (HomeId, InventoryId, Brand, ModelNumber, PurchaseDate)
                        OUTPUT INSERTED.ID
                        VALUES (@HomeId, @InventoryId, @Brand, @ModelNumber, @PurchaseDate)";
                    cmd.Parameters.AddWithValue("@HomeId", inventory.HomeId);
                    cmd.Parameters.AddWithValue("@InventoryId", inventory.InventoryId);
                    cmd.Parameters.AddWithValue("@Brand", DbUtils.ValueOrDBNull(inventory.Brand));
                    cmd.Parameters.AddWithValue("@ModelNumber", DbUtils.ValueOrDBNull(inventory.ModelNumber));
                    cmd.Parameters.AddWithValue("@PurchaseDate", DbUtils.ValueOrDBNull(inventory.PurchaseDate));

                    inventory.Id = (int)cmd.ExecuteScalar();
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

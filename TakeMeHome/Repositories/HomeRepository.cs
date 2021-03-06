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

        public Home GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT h.Id, h.FirstName, h.LastName, h.Email, h.ConstructedDate, h.PurchaseDate, i.InventoryId, i.HomeId, i.Id as HomeInventoryId 
                          FROM Home h
                           Left Join HomeInventory i on i.HomeId = h.Id
                         WHERE h.Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    Home home = null;

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        if (home == null)
                        {
                            {
                                home = NewHomeFromReader(reader);
                            };
                        }

                        if (DbUtils.IsNotDbNull(reader, "HomeInventoryId"))
                        {
                            home.Inventory.Add(new HomeInventory()
                            {
                                Id = DbUtils.GetInt(reader, "HomeInventoryId"),
                                InventoryId = DbUtils.GetInt(reader, "InventoryId"),
                                HomeId = DbUtils.GetInt(reader,"HomeId")
                             
                            });


                        }
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
                    cmd.CommandText = @"INSERT INTO Home (FirstName, LastName, Email, ConstructedDate, PurchaseDate)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirstName, @LastName, @Email, 
                                                @ConstructedDate, @PurchaseDate)";
                    DbUtils.AddParameter(cmd, "@FirstName", home.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", home.LastName);
                    DbUtils.AddParameter(cmd, "@Email", home.Email);
                    DbUtils.AddParameter(cmd, "@ConstructedDate", home.ConstructedDate);
                    DbUtils.AddParameter(cmd, "@PurchaseDate", home.PurchaseDate);


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
                PurchaseDate = (DateTime)DbUtils.GetNullableDateTime(reader, "PurchaseDate"),
                Inventory = new List<HomeInventory>()
            

            };
        }

    }
}


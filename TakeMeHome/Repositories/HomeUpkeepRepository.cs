﻿using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using TakeMeHome.Models;
using TakeMeHome.Utils;

namespace TakeMeHome.Repositories
{
    public class HomeUpkeepRepository : BaseRepository, IHomeUpkeepRepository
    {
        public HomeUpkeepRepository(IConfiguration configuration) : base(configuration) { }


        public List<HomeUpkeep> GetAllMyUpkeeps(int homeId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT hu.Id, hu.ScheduleDate, hu.HomeId, hu.UpkeepId, hu.Cost, hu.Count,
                                               u.Title, u.Description, u.InventoryId, u.Id as UpkeepId, u.NumberOfMonths,
                                               i.Name as InventoryName, h.FirstName, h.LastName, h.ConstructedDate 
                                        FROM HomeUpkeep hu
                                        Left Join Home h On h.id = hu.HomeId
                                        Left Join Upkeep u on u.Id = hu.UpkeepId
                                        Left Join Inventory i On i.Id = u.InventoryId
                                        Where hu.HomeId = @homeId
                                        Order By hu.ScheduleDate ASC";

                    DbUtils.AddParameter(cmd, "@homeId", homeId);

                    var reader = cmd.ExecuteReader();

                    var upKeeps = new List<HomeUpkeep>();

                    while (reader.Read())
                    {

                        upKeeps.Add(new HomeUpkeep()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ScheduleDate = DbUtils.GetDateTime(reader, "ScheduleDate"),
                            Cost = DbUtils.GetNullableInt(reader, "Cost"),
                            Count = DbUtils.GetNullableInt(reader, "Count"),
                            UpkeepId = DbUtils.GetInt(reader, "UpkeepId"),
                            Upkeep = new Upkeep()
                            {
                                InventoryId = DbUtils.GetInt(reader, "InventoryId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Description = DbUtils.GetString(reader, "Description"),
                                NumberOfMonths = DbUtils.GetInt(reader, "NumberOfMonths"),
                                Inventory = new Inventory()
                                {
                                    Id = DbUtils.GetInt(reader, "InventoryId"),
                                    Name = DbUtils.GetString(reader, "InventoryName"),
                                }
                            },
                            HomeId = homeId,
                            Home = new Home()
                            {
                                Id = homeId,
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                ConstructedDate = DbUtils.GetDateTime(reader, "ConstructedDate")
                            }
                        });




                    }
                    reader.Close();

                    return upKeeps;
                }


            }
        }
        public HomeUpkeep GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT hu.Id, hu.ScheduleDate, hu.HomeId, hu.UpkeepId, hu.Cost, hu.Count,
                                               u.Title, u.Description, u.InventoryId, u.Id as UpkeepId, u.NumberOfMonths,
                                               i.Name as InventoryName, h.FirstName, h.LastName, h.ConstructedDate 
                                        FROM HomeUpkeep hu
                                        Left Join Home h On h.id = hu.HomeId
                                        Left Join Upkeep u on u.Id = hu.UpkeepId
                                        Left Join Inventory i On i.Id = u.InventoryId
                           WHERE hu.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    HomeUpkeep upkeep = null;
                    if (reader.Read())
                    {
                        upkeep = new HomeUpkeep()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ScheduleDate = DbUtils.GetDateTime(reader, "ScheduleDate"),
                            Cost = DbUtils.GetNullableInt(reader, "Cost"),
                            Count = DbUtils.GetNullableInt(reader, "Count"),
                            UpkeepId = DbUtils.GetInt(reader, "UpkeepId"),
                            Upkeep = new Upkeep()
                            {
                                InventoryId = DbUtils.GetInt(reader, "InventoryId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Description = DbUtils.GetString(reader, "Description"),
                                NumberOfMonths = DbUtils.GetInt(reader, "NumberOfMonths"),
                                Inventory = new Inventory()
                                {
                                    Id = DbUtils.GetInt(reader, "InventoryId"),
                                    Name = DbUtils.GetString(reader, "InventoryName"),
                                }
                            },
                            HomeId = DbUtils.GetInt(reader, "HomeId"),
                            Home = new Home()
                            {
                                Id = DbUtils.GetInt(reader, "HomeId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                ConstructedDate = DbUtils.GetDateTime(reader, "ConstructedDate")
                            }
                        };

                    }
                    reader.Close();

                    return upkeep;
                }
            }

        }
    }
}

using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using TakeMeHome.Models;
using TakeMeHome.Utils;

namespace TakeMeHome.Repositories
{
    public class HomeUpkeepRepository : BaseRepository, IHomeUpkeepRepository
    {
        public HomeUpkeepRepository(IConfiguration configuration) : base(configuration) { }


        public IEnumerable <Month> GetAllMyUpkeeps(int homeId)
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
                                        Where hu.HomeId = @homeId AND YEAR(hu.ScheduleDate) = YEAR(GETDATE())
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

                        var upkeepId = DbUtils.GetInt(reader, "Id");

                        var existingupkeep = upKeeps.FirstOrDefault(a => a.Id == upkeepId);

                    }



                    

                    reader.Close();


               var upkeepsGrouped = upKeeps.GroupBy(u => new 
               {
            m = u.ScheduleDate.ToString("MMMM"),
            v = u.Upkeep.Inventory.Name,
            u.ScheduleDate.Year,
    
        }).Select(gcs => new Month()
        {
            
            Year = gcs.Key.Year,
            Name = gcs.Key.m,
            ItemName = gcs.Key.v,
            Upkeeps = gcs.ToList()
            
        });


                    return upkeepsGrouped;
                }


            }
        }
        public IEnumerable<Month> GetAllMyUpkeepsThisMonth(int homeId)
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
                                        Where hu.HomeId = @homeId AND MONTH(hu.ScheduleDate) = MONTH(GETDATE()) AND YEAR(hu.ScheduleDate) = YEAR(GETDATE())
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

                        var upkeepId = DbUtils.GetInt(reader, "Id");

                        var existingupkeep = upKeeps.FirstOrDefault(a => a.Id == upkeepId);

                    }





                    reader.Close();


                    var upkeepsGrouped = upKeeps.GroupBy(u => new
                    {
                        m = u.ScheduleDate.ToString("MMMM"),
                        v = u.Upkeep.Inventory.Name,
                        u.ScheduleDate.Year,

                    }).Select(gcs => new Month()
                    {

                        Year = gcs.Key.Year,
                        Name = gcs.Key.m,
                        ItemName = gcs.Key.v,
                        Upkeeps = gcs.ToList()

                    });





                    /* var GroupBy = upKeeps.GroupBy(u => new Month
       {
           Year = u.ScheduleDate.Year,
           Name = u.ScheduleDate.Month,
           Inventory = new List<HomeInventory>()
           {

           }
       }).Select(uk => uk.ToList()).ToList();*/


                    return upkeepsGrouped;
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
        public void CompleteUpkeep(HomeUpkeep homeupkeep, int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.NumberOfMonths, u.Id, hu.Cost FROM Upkeep u
                        Left JOiN HomeUpkeep hu on hu.UpkeepId = u.id
                        Where hu.Id = @Id;
                       ";

                    cmd.Parameters.AddWithValue("@Id", homeupkeep.Id);
                    var reader = cmd.ExecuteReader();

                    HomeUpkeep upkeep = null;
                    if (reader.Read())
                    {
                        upkeep = new HomeUpkeep()
                        {
                            Cost = DbUtils.GetNullableInt(reader, "Cost"),
                            Upkeep = new Upkeep()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                NumberOfMonths = DbUtils.GetInt(reader, "NumberOfMonths"),
                            }

                        };
                      

                    }

                    reader.Close();
                    string upKeepInsertStatement = "";
                   
                        DateTime today = DateTime.Now;
                        DateTime scheduleDate = today.AddMonths(upkeep.Upkeep.NumberOfMonths);
                        upKeepInsertStatement += $@"
                            UPDATE HomeUpkeep
                            SET
                               [ScheduleDate] = '{scheduleDate}',
                               [Count] = @Count,
                               [Cost] = @Cost
                               WHERE Id = @HomeUpkeepId";
                    
                    cmd.CommandText = upKeepInsertStatement;

                    cmd.Parameters.AddWithValue("@HomeUpkeepId", id);
                    cmd.Parameters.AddWithValue("@Cost", upkeep.Cost == null ? 0 + homeupkeep.Cost : upkeep.Cost + homeupkeep.Cost);
                    cmd.Parameters.AddWithValue("@Count", homeupkeep.Count + 1);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

using Microsoft.Extensions.Configuration;
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
                                               u.Title, u.Description, u.InventoryId, u.Id as UpkeepId,
                                               i.Name, h.FirstName, h.LastName, h.ConstructedDate 
                                        FROM HomeUpkeep hu
                                        Left Join Home h On h.id = hu.HomeId
                                        Left Join Upkeep u on u.Id = hu.UpkeepId
                                        Left Join Inventory i On i.Id = u.InventoryId
                                        Where hu.HomeId = @homeId;";

                    DbUtils.AddParameter(cmd, "@homeId", homeId);

                    var reader = cmd.ExecuteReader();

                    var upKeeps = new List<HomeUpkeep>();

                    while (reader.Read())
                    {
                        if (DbUtils.IsNotDbNull(reader, "Id"))
                        {
                            upKeeps.Add(new HomeUpkeep()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                ScheduleDate = DbUtils.GetDateTime(reader,"ScheduleDate"),
                                Cost = DbUtils.GetInt(reader, "Cost"),
                                Count = DbUtils.GetInt(reader, "Count"),
                                UpkeepId = DbUtils.GetInt(reader, "InventoryName"),
                                Upkeep = new Upkeep()
                                {
                                    InventoryId = DbUtils.GetInt(reader,"UpkeepId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    Description = DbUtils.GetString(reader,"Description")
                                },
                                HomeId = homeId,
                                Home = new Home()
                                {
                                    Id = homeId,
                                    FirstName = DbUtils.GetString(reader,"FirstName"),
                                    LastName = DbUtils.GetString(reader,"LastName"),
                                    ConstructedDate = DbUtils.GetDateTime(reader,"ConstructedDate")
                                }
                            });


                        }

                    }
                    reader.Close();

                    return upKeeps;
                }
            }
        }

    }
}

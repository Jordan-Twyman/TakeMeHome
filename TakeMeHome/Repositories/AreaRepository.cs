using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using TakeMeHome.Models;
using TakeMeHome.Utils;

namespace TakeMeHome.Repositories
{
    public class AreaRepository : BaseRepository, IAreaRepository
    {
        public AreaRepository(IConfiguration configuration) : base(configuration) { }


        public List<Area> GetAllAreas()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT a.Id, a.Name, i.Id as InventoryId, i.Name as InventoryName, i.AreaId 
                                        FROM Area a
                                        Left Join Inventory i On i.AreaId = a.Id
                                        Order by a.name asc";
                    var reader = cmd.ExecuteReader();

                    var areas = new List<Area>();

                    while (reader.Read())
                    {
                        var areaId = DbUtils.GetInt(reader, "Id");

                        var existingArea = areas.FirstOrDefault(a => a.Id == areaId);
                        if (existingArea == null)
                        {
                            existingArea = new Area()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("name")),
                                InventoryItems = new List<Inventory>()
                            };
                            areas.Add(existingArea);
                        }
                        if (DbUtils.IsNotDbNull(reader, "InventoryId"))
                        {
                            existingArea.InventoryItems.Add(new Inventory()
                            {
                                Id = DbUtils.GetInt(reader, "InventoryId"),
                                Name = DbUtils.GetString(reader, "InventoryName"),
                                AreaId = DbUtils.GetInt(reader, "AreaId")
                            });

                           
                        }
                       
                    }
                    reader.Close();

                    return areas;
                }
            }
        }

        public List<Area> GetAllAreasWithMyInventory(int homeId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT a.Id, a.Name, i.Id as InventoryId, i.Name as InventoryName, i.AreaId, hi.InventoryId 
                                        FROM Area a
                                        Left Join Inventory i On i.AreaId = a.Id
                                        Left Join HomeInventory hi on hi.InventoryId = i.Id
                                        WHERE hi.HomeId = @homeId;";

                    DbUtils.AddParameter(cmd, "@homeId", homeId);

                    var reader = cmd.ExecuteReader();

                    var areas = new List<Area>();

                    while (reader.Read())
                    {
                        var areaId = DbUtils.GetInt(reader, "Id");

                        var existingArea = areas.FirstOrDefault(a => a.Id == areaId);
                        if (existingArea == null)
                        {
                            existingArea = new Area()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("name")),
                                InventoryItems = new List<Inventory>()
                            };
                            areas.Add(existingArea);
                        }
                        if (DbUtils.IsNotDbNull(reader, "InventoryId"))
                        {
                            existingArea.InventoryItems.Add(new Inventory()
                            {
                                Id = DbUtils.GetInt(reader, "InventoryId"),
                                Name = DbUtils.GetString(reader, "InventoryName"),
                                AreaId = DbUtils.GetInt(reader, "AreaId")
                            });


                        }

                    }
                    reader.Close();

                    return areas;
                }
            }
        }


    }
}

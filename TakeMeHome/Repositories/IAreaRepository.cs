using System.Collections.Generic;
using TakeMeHome.Models;

namespace TakeMeHome.Repositories
{
    public interface IAreaRepository
    {
        List<Area> GetAllAreas();
        List<Area> GetAllAreasWithMyInventory(int homeId);
    }
}
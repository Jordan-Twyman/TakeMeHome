using System.Collections.Generic;
using TakeMeHome.Models;

namespace TakeMeHome.Repositories
{
    public interface IHomeUpkeepRepository
    {
        void CompleteUpkeep(HomeUpkeep upkeep, int id);
        List<HomeUpkeep> GetAllMyUpkeeps(int homeId);
        HomeUpkeep GetById(int id);
    }
}
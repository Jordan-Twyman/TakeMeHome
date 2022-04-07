using System.Collections.Generic;
using TakeMeHome.Models;

namespace TakeMeHome.Repositories
{
    public interface IHomeUpkeepRepository
    {
        List<HomeUpkeep> GetAllMyUpkeeps(int homeId);
    }
}
using System.Collections.Generic;
using TakeMeHome.Models;

namespace TakeMeHome.Repositories
{
    public interface IHomeInventoryRepository
    {
        void Add(HomeInventory inventory);
        List<Inventory> GetAllInventory();
        HomeInventory GetById(int id);
        void UpdateInventory(HomeInventory inventory, int id);
    }
}
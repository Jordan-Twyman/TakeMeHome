using TakeMeHome.Models;

namespace TakeMeHome.Repositories
{
    public interface IHomeRepository
    {
        void Add(Home home);
        Home GetByEmail(string email);
    }
}
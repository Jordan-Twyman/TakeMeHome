namespace TakeMeHome.Models
{
    public class HomeArea
    {
        public int Id { get; set; }
        public int HomeId { get; set; }
        public int AreaId { get; set; }  
        public Area Area { get; set; }  
        public Home Home { get; set; }

    }
}

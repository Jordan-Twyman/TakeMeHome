using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using TakeMeHome.Models;
using TakeMeHome.Utils;
using Microsoft.Data.SqlClient;
using TakeMeHome.Repositories;

namespace TakeMeHome.Repositories
{
    public class HomeRepository : BaseRepository, IHomeRepository
    {
        public HomeRepository(IConfiguration configuration) : base(configuration) { }


        public Home GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT FirstName, LastName, Email, ConstructedDate, HomeType
                          FROM Home
                         WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    Home home = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        home = NewHomeFromReader(reader);
                    }
                    reader.Close();

                    return home;
                }
            }
        }

        public void Add(Home home)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Home (FirstName, LastName, Email, ConstructedDate, HomeType)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirstName, @LastName, @Email, 
                                                @ConstructedDate, @HomeType)";
                    DbUtils.AddParameter(cmd, "@FirstName", home.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", home.LastName);
                    DbUtils.AddParameter(cmd, "@Email", home.Email);
                    DbUtils.AddParameter(cmd, "@ConstructedDate", home.ConstructedDate);
                    DbUtils.AddParameter(cmd, "@HomeType", home.HomeType);

                    home.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        private Home NewHomeFromReader(SqlDataReader reader)
        {
            return new Home()
            {

                Id = DbUtils.GetInt(reader, "Id"),
                FirstName = DbUtils.GetString(reader, "FirstName"),
                LastName = DbUtils.GetString(reader, "LastName"),
                Email = DbUtils.GetString(reader, "Email"),
                ConstructedDate = DbUtils.GetDateTime(reader, "ConstructedDate"),
                HomeType = DbUtils.GetString(reader, "HomeType"),
              
            };
        }

    }
}


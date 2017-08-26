namespace TodoList.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Addingpasswordtouser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AppUsers", "Password", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AppUsers", "Password");
        }
    }
}

namespace TodoList.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatedFields : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.AppUsers", "Email", c => c.String(maxLength: 150, unicode: false));
            CreateIndex("dbo.AppUsers", "Email", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.AppUsers", new[] { "Email" });
            AlterColumn("dbo.AppUsers", "Email", c => c.String());
        }
    }
}

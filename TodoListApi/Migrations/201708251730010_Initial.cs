namespace TodoList.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AppUsers",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Email = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Todoes",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        DueDate = c.DateTime(nullable: false),
                        CreatedOn = c.DateTime(nullable: false),
                        Description = c.String(),
                        Priority = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.AppUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Todoes", "UserId", "dbo.AppUsers");
            DropIndex("dbo.Todoes", new[] { "UserId" });
            DropTable("dbo.Todoes");
            DropTable("dbo.AppUsers");
        }
    }
}

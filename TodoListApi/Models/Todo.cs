using System;

namespace TodoList.Api.Models
{
    /// <summary>
    /// Todo Item
    /// </summary>
    public class Todo
    {
        /// <summary>
        /// Id
        /// </summary>
        public int ID { get; set; }
        /// <summary>
        /// Item due date
        /// </summary>
        public DateTime DueDate { get; set; }
        /// <summary>
        /// Added on this date
        /// </summary>
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        /// <summary>
        /// What to do
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Priority
        /// </summary>
        public TodoPriority Priority { get; set; } = TodoPriority.Low;
        /// <summary>
        /// Status
        /// </summary>
        public TodoStatus Status { get; set; } = TodoStatus.New;

        /// <summary>
        /// User id
        /// </summary>
        public int UserId { get; set; }
        /// <summary>
        /// User information
        /// </summary>
        public virtual AppUser User { get; set; }
    }
}
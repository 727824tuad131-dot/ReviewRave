import React from "react";

const RecentActivity = ({ activities = [] }) => {
  return (
    <div className="activity-card">
      <div className="activity-card-header">
        <div>
          <span className="card-eyebrow">
            ACTIVITY
          </span>

          <h2>Recent Activity</h2>
        </div>

        <div className="activity-header-icon">
          ◷
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="activity-empty">
          <div className="activity-empty-icon">
            ◷
          </div>

          <p>No recent activity.</p>
        </div>
      ) : (
        <div className="activity-list">
          {activities.map((activity, index) => (
            <div
              className="activity-item"
              key={
                activity.id ||
                `${activity.description}-${index}`
              }
            >
              <div className="activity-marker">
                <span></span>
              </div>

              <div className="activity-content">
                <p className="activity-description">
                  {activity.description}
                </p>

                <span className="activity-time">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
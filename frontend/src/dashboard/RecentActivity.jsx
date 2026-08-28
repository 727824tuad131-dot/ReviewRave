import React from "react";

const RecentActivity = ({
  activities = []
}) => {
  return (
    <div className="activity-card">

      <h2>
        Recent Activity
      </h2>

      {activities.length === 0 ? (

        <div className="empty-state">
          No recent activity.
        </div>

      ) : (

        <div className="timeline">

          {activities.map(
            (activity, index) => (

              <div
                className="timeline-item"
                key={index}
              >

                <div className="timeline-dot" />

                <div className="timeline-content">

                  <p>
                    {activity.description}
                  </p>

                  <span>
                    {activity.time}
                  </span>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
};

export default RecentActivity;
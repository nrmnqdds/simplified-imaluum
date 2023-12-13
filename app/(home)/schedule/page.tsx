"use client";

import { useState } from "react";
import Timetable from "@/components/schedule";
import ScheduleSwitcher from "@/components/ScheduleSwitcher";
import ImaluumClient from "@/utils/imaluumClient";

const Page = () => {
	const [subjects, setSubjects] = useState<Courses[]>();

	const { courses } = ImaluumClient() || {};

	return (
		<div className="flex-1 min-h-screen">
			{!courses ? (
				<div>Loading...</div>
			) : (
				<div className="w-fit p-2">
					{/* <SessionSwitcher setEvents={setEvents} /> */}
					<ScheduleSwitcher courses={courses} setEvents={setSubjects} />
				</div>
			)}
			<Timetable events={!subjects ? [] : subjects[0].schedule} />
		</div>
	);
};

export default Page;

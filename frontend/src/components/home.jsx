import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Landingpage from "./landingpage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Years from "../pages/years";
import Subjectcard from "../pages/subjectcard";
import Chaptername from "../pages/chaptername";
import TopicsNotes from "../pages/topicscontent";
import Aisupport from "../pages/aisupport";
import { checkUser } from "../authsllice";

export default function Home() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Landingpage /> : <Navigate to="/register" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/year" element={<Years />} />
      <Route path="/subject/:year/getsubject" element={<Subjectcard />} />
      <Route path="/chapter/:subjectname/getchapters" element={<Chaptername />} />
      <Route path="/topics/:chaptername/gettopics" element={<TopicsNotes />} />
      <Route path="/ai/chat" element={<Aisupport />} />
    </Routes>
  );
}

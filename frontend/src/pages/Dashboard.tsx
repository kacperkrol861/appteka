import AppLayout from "../layout/AppLayout";

export default function Dashboard() {
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        System Appteka działa 💊
      </p>
    </AppLayout>
  );
}
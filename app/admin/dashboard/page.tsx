"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react"

// Mock data
const appointmentData = [
  { date: "Lun", appointments: 12, revenue: 450 },
  { date: "Mar", appointments: 19, revenue: 680 },
  { date: "Mié", appointments: 15, revenue: 520 },
  { date: "Jue", appointments: 21, revenue: 750 },
  { date: "Vie", appointments: 28, revenue: 1020 },
  { date: "Sab", appointments: 25, revenue: 890 },
  { date: "Dom", appointments: 8, revenue: 280 },
]

const serviceData = [
  { name: "Corte Clásico", count: 42, revenue: 1050 },
  { name: "Coloración", count: 28, revenue: 1680 },
  { name: "Manicura", count: 35, revenue: 700 },
  { name: "Pedicura", count: 22, revenue: 1100 },
  { name: "Balayage", count: 18, revenue: 1440 },
]

const specialistData = [
  { name: "Carlos García", bookings: 45, rating: 4.9 },
  { name: "María López", bookings: 52, rating: 4.95 },
  { name: "Ana Rodríguez", bookings: 38, rating: 4.88 },
  { name: "Laura Martínez", bookings: 41, rating: 4.92 },
]

const COLORS = ["#FF007F", "#00E5FF", "#7F00FF", "#FFA500", "#00FF00"]

export default function AdminDashboard() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Panel Administrativo</h1>
      <p className="text-muted-foreground mb-8">Gestión completa del salón</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Citas Esta Semana</p>
                <p className="text-3xl font-bold mt-2">128</p>
                <p className="text-xs text-green-600 mt-1">↑ 12% vs la semana pasada</p>
              </div>
              <Calendar className="w-8 h-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ingresos Esta Semana</p>
                <p className="text-3xl font-bold mt-2 text-primary">$4,570</p>
                <p className="text-xs text-green-600 mt-1">↑ 8% vs la semana pasada</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Clientes Activos</p>
                <p className="text-3xl font-bold mt-2">347</p>
                <p className="text-xs text-green-600 mt-1">↑ 23 nuevos este mes</p>
              </div>
              <Users className="w-8 h-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasa de Ocupación</p>
                <p className="text-3xl font-bold mt-2">87%</p>
                <p className="text-xs text-green-600 mt-1">Muy buena esta semana</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">Citas y Ingresos</TabsTrigger>
          <TabsTrigger value="services">Servicios Populares</TabsTrigger>
          <TabsTrigger value="specialists">Especialistas</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Citas e Ingresos por Día</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="appointments" stroke="#FF007F" name="Citas" />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#00E5FF" name="Ingresos ($)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Servicios Más Solicitados</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={serviceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#FF007F" name="Reservas" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ingresos por Servicio</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={serviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, revenue }) => `${name}: $${revenue}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="revenue"
                    >
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="specialists">
          <Card>
            <CardHeader>
              <CardTitle>Desempeño de Especialistas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {specialistData.map((specialist) => (
                  <div key={specialist.name} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{specialist.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{specialist.bookings} reservas</span>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                          ⭐ {specialist.rating}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                        style={{ width: `${(specialist.bookings / 52) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

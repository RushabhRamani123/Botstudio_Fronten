"use client"

import { useState } from "react"
import { Bell, BookText, Check, MessageSquareText, Plus, Search, SettingsIcon, Star, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Switch } from "../ui/switch"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export default function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState("canned-messages")
  const [soundNotification, setSoundNotification] = useState(false)
  const [pushNotification, setPushNotification] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [cannedMessages, setCannedMessages] = useState([
    // Example data - in a real app this would come from an API
    {
      id: 1,
      name: "Welcome Message",
      type: "Greeting",
      text: "Hello! Thanks for reaching out. How can I help you today?",
      createdBy: "John Doe",
      favorite: true,
    },
    {
      id: 2,
      name: "Out of Office",
      type: "Status",
      text: "I'm currently out of the office and will respond to your message when I return.",
      createdBy: "Jane Smith",
      favorite: false,
    },
  ])

  // Filter messages based on search query
  const filteredMessages = cannedMessages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.text.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleFavorite = (id:string) => {
    setCannedMessages((messages) =>
      messages.map((message) => (message.id === id ? { ...message, favorite: !message.favorite } : message)),
    )
  }

  const deleteMessage = (id:string) => {
    setCannedMessages((messages) => messages.filter((message) => message.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <SettingsIcon className="h-6 w-6" />
            Settings
          </h2>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-2">
          <Button
            variant={activeTab === "canned-messages" ? "secondary" : "ghost"}
            className="w-full justify-start gap-3 mb-1 font-medium"
            onClick={() => setActiveTab("canned-messages")}
          >
            <MessageSquareText className="h-5 w-5" />
            Canned Messages
            {cannedMessages.length > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {cannedMessages.length}
              </Badge>
            )}
          </Button>
          <Button
            variant={activeTab === "notification-preferences" ? "secondary" : "ghost"}
            className="w-full justify-start gap-3 font-medium"
            onClick={() => setActiveTab("notification-preferences")}
          >
            <Bell className="h-5 w-5" />
            Notification Preferences
          </Button>
        </nav>
      </div>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-10 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Settings
          </h2>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="grid grid-cols-2 w-[280px]">
              <TabsTrigger value="canned-messages">Messages</TabsTrigger>
              <TabsTrigger value="notification-preferences">Notifications</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:p-8 p-4 md:pt-8 pt-20">
        {activeTab === "canned-messages" && (
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Canned Messages</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Save message templates and use them in live chat to respond quickly.
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-blue-600">
                    <Plus className="h-4 w-4" />
                    Create Message
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Canned Message</DialogTitle>
                    <DialogDescription>Add a new message template to your collection.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="e.g., Welcome Message" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="greeting">Greeting</SelectItem>
                          <SelectItem value="status">Status</SelectItem>
                          <SelectItem value="response">Response</SelectItem>
                          <SelectItem value="closing">Closing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Enter your message template here..." rows={4} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Message</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="mb-8">
              <CardHeader className="pb-3">
                <CardTitle>Quick Guide</CardTitle>
                <CardDescription>Learn how to create and use canned messages effectively.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BookText className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Create personalized templates</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Create message templates for common scenarios to save time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Favorite your most used messages</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Mark messages as favorites for quick access during conversations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
              <Input
                placeholder="Search canned messages by name or content..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="hidden md:table-cell">Text</TableHead>
                    <TableHead className="hidden md:table-cell">Created By</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell className="font-medium">{message.name}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">{message.type}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell max-w-[300px] truncate">{message.text}</TableCell>
                        <TableCell className="hidden md:table-cell">{message.createdBy}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleFavorite(message.id)}
                              className={message.favorite ? "text-yellow-500" : ""}
                            >
                              <Star className="h-4 w-4" />
                              <span className="sr-only">Favorite</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteMessage(message.id)}
                              className="text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        {searchQuery ? (
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Search className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                            <p className="text-slate-500 dark:text-slate-400">
                              No messages found matching "{searchQuery}"
                            </p>
                            <Button variant="link" className="bg-blue-600" onClick={() => setSearchQuery("")}>
                              Clear search
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-2">
                            <MessageSquareText className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                            <p className="text-slate-500 dark:text-slate-400">No canned messages found</p>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="link">Create your first message</Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Create Canned Message</DialogTitle>
                                  <DialogDescription>Add a new message template to your collection.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="e.g., Welcome Message" />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="type">Type</Label>
                                    <Select>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="greeting">Greeting</SelectItem>
                                        <SelectItem value="status">Status</SelectItem>
                                        <SelectItem value="response">Response</SelectItem>
                                        <SelectItem value="closing">Closing</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" placeholder="Enter your message template here..." rows={4} />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Save Message</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {activeTab === "notification-preferences" && (
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Notification Preferences
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Manage how you receive notifications from the system.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure your notification preferences to stay informed without being overwhelmed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Sound Notifications</Label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Play a sound when you receive a new notification
                      </p>
                    </div>
                    <Switch checked={soundNotification} onCheckedChange={setSoundNotification} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Push Notifications</Label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Receive notifications even when you're not using the application
                      </p>
                    </div>
                    <Switch checked={pushNotification} onCheckedChange={setPushNotification} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-6">
                <Button variant="outline">Reset to Defaults</Button>
                <Button className="bg-blue-600">Save Changes</Button>
              </CardFooter>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>Choose where you want to receive different types of notifications.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="font-medium">Message Notifications</div>
                    <div className="col-span-2 flex flex-wrap gap-2">
                      <Badge variant="outline" className="flex items-center gap-1 bg-primary/5">
                        <Check className="h-3 w-3" /> Email
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1 bg-primary/5">
                        <Check className="h-3 w-3" /> In-app
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        Mobile
                      </Badge>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="font-medium">System Updates</div>
                    <div className="col-span-2 flex flex-wrap gap-2">
                      <Badge variant="outline" className="flex items-center gap-1 bg-primary/5">
                        <Check className="h-3 w-3" /> Email
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        In-app
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        Mobile
                      </Badge>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="font-medium">Security Alerts</div>
                    <div className="col-span-2 flex flex-wrap gap-2">
                      <Badge variant="outline" className="flex items-center gap-1 bg-primary/5">
                        <Check className="h-3 w-3" /> Email
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1 bg-primary/5">
                        <Check className="h-3 w-3" /> In-app
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1 bg-primary/5">
                        <Check className="h-3 w-3" /> Mobile
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-slate-200 dark:border-slate-700 pt-6">
                <Button className="bg-blue-600">Update Preferences</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}


import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Phone, Mail, MapPin } from "lucide-react";
import useStore from "../../app/chatStore";
interface UserProfileProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
}
function UserProfile({ isDrawerOpen, setIsDrawerOpen }: UserProfileProps) {
  const { selectedChatId, chats } = useStore();
  const selectedChat = chats.find((chat) => chat.id === selectedChatId);
  if (!selectedChat) {
    return null;
  }
  return (
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl">{selectedChat.name}</SheetTitle>
          <SheetDescription>User profile and details</SheetDescription>
        </SheetHeader>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={`/api/placeholder/80/80`}
                alt={selectedChat.name}
              />
              <AvatarFallback>{selectedChat.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{selectedChat.name}</h2>
              <Badge variant="outline" className="mt-2">
                Customer
              </Badge>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>
                  {selectedChat.name.toLowerCase().replace(" ", ".")}
                  @example.com
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>New York, NY</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Last message: {selectedChat.message}
              </p>
            </CardContent>
          </Card>
        </div>
        <SheetFooter className="mt-6">
          <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default UserProfile;

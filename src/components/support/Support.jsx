import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"

const Support = () => {
  
  return (
    <div className="support p-5">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Support</CardTitle>
        <CardDescription>
            Please enter the details of your issue or inquiry in the message below. Our support team will review your message and respond as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="texarea">Your message</Label>
          <Textarea type="text" placeholder="Enter the message" style={{ height: '10rem' }} required />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Submit</Button>
      </CardFooter>
    </Card>
    </div>
  );
}

export default Support;

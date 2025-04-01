import { BotTemplateTableProps, Template } from "../../app/DTO";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const BotTemplateTable = ({
  templates,
  onTemplateClick,
}: BotTemplateTableProps) => {
  // Helper function to safely format date
  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Template Name</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Last Modified</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates?.map((template: Template) => (
          <TableRow
            key={template.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => onTemplateClick(template.id)}
          >
            <TableCell className="font-medium">{template.name}</TableCell>
            <TableCell>
              {formatDate(template.createdAt)}
            </TableCell>
            <TableCell>
              {formatDate(template.modifiedAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BotTemplateTable;
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
              {new Date(template.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(template?.modifiedAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BotTemplateTable;

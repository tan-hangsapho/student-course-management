import { CourseService } from "src/services/course.service";

export class CourseController {
  private courseService: CourseService;
  constructor() {
    this.courseService = new CourseService();
  }
}

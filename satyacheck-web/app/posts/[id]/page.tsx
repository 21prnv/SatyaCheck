"use client";

import { useState, useEffect, ChangeEvent, use } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  ThumbsUp,
  MessageSquare,
  Share,
  Bookmark,
  AlertTriangle,
  Flag,
  Send,
  CheckCircle,
  Link,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supbase/client";
import { toast } from "sonner";

// Initialize Supabase client

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  time: string;
  upvotes: number;
}

interface NewsItem {
  id: number;
  user_id: string | null;
  created_at: string;
  isFake: string;
  fake_percentage: number;
  real_percentage: string;
  reasons_for_determination: string;
  related_links: string[];
  author_verified: string;
  post_date: string;
  subject_expertise: string;
  media_presence: string;
  cross_check_sources: string[];
  upvotes: number;
  votes: string[];
  title?: string;
  url?: string;
  image?: string;
}

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const supabase = createClient();

  const id = params.id as string;
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      console.log(user);

      if (user) {
        const { data: userData } = await supabase
          .from("user")
          .select("*")
          .eq("id", user.id)
          .single();
        console.log(userData);
        setCurrentUser(userData);
      }
    };
    fetchUser();
  }, []);

  // Fetch the post data from Supabase
  useEffect(() => {
    if (!id) return;

    const fetchPostFromSupabase = async () => {
      try {
        // Fetch the news item from Supabase
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          // Process the data and set default values if needed
          const postData: NewsItem = {
            ...data,
            // Parse JSON strings if they come as strings from the database
            related_links:
              typeof data.related_links === "string"
                ? JSON.parse(data.related_links)
                : data.related_links || [],
            cross_check_sources:
              typeof data.cross_check_sources === "string"
                ? JSON.parse(data.cross_check_sources)
                : data.cross_check_sources || [],
            title: data.title || "News Verification Report", // Default title
            image: data.image || "/fact-check-default.jpg", // Default image
            url: data.url || null,
          };

          setPost(postData);
          setUpvoteCount(postData.votes.length);
          // Set initial upvote state based on current user
          setIsUpvoted(
            currentUser ? postData.votes.includes(currentUser.id) : false
          );

          // Fetch comments if you have a comments table
        } else {
          // No data found
          setPost(null);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    // Fetch comments from Supabase

    fetchPostFromSupabase();
  }, [id, currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select(
          `
        *,
        user:user_id (
          name,
          avatar
        )
      `
        )
        .eq("news_id", id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching comments:", error);
        return;
      }

      const formattedComments = data.map((comment) => ({
        id: comment.id,
        author: comment.user.name,
        avatar: comment.user.avatar,
        text: comment.text,
        time: new Date(comment.created_at).toLocaleString(),
        upvotes: comment.likes,
      }));

      setComments(formattedComments);
    };

    fetchComments();

    // Set up real-time subscription
    const commentsChannel = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        (payload) => {
          const newComment = {
            id: payload.new.id,
            author: currentUser.name,
            avatar: currentUser.avatar,
            text: payload.new.text,
            time: "Just now",
            upvotes: payload.new.likes,
          };
          setComments((prevComments) => [newComment, ...prevComments]);
        }
      )
      .subscribe();

    // Cleanup function to unsubscribe from the channel
    return () => {
      supabase.removeChannel(commentsChannel);
    };
  }, [id, currentUser]);

  const handleOpenSource = () => {
    if (post?.url != null) {
      window.open(post.url, "_blank");
    } else {
      toast.error("Source URL not found", {
        style: {
          backgroundColor: "#f44336",
          color: "white",
        },
      });
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  // First, update the NewsItem interface to include votes array

  // Then modify the handleUpvote function:
  const handleUpvote = async () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }

    try {
      const currentVotes = post?.votes || [];
      let newVotes;

      if (currentVotes.includes(currentUser.id)) {
        // Remove user's vote
        newVotes = currentVotes.filter((id) => id !== currentUser.id);
      } else {
        // Add user's vote
        newVotes = [...currentVotes, currentUser.id];
      }

      const { data, error } = await supabase
        .from("news")
        .update({ votes: newVotes })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setPost((prevPost) => ({
        ...prevPost!,
        votes: newVotes,
      }));
      setUpvoteCount(newVotes.length);
      setIsUpvoted(newVotes.includes(currentUser.id));
    } catch (error) {
      console.error("Error updating votes:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          news_id: parseInt(id),
          text: comment,
          user_id: currentUser.id,
          likes: 0,
        })
        .select()
        .single();

      if (error) throw error;

      // Add real-time subscription if not already added

      // Clear the comment input
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);

    // Show a toast notification using sonner

    toast.success("Link copied to clipboard!", {
      style: {
        backgroundColor: "blue",
        color: "white",
      },
    });
  };

  const handleSave = () => {
    // Toggle saved state
    setIsSaved(!isSaved);

    // In a real implementation, you would save to a user_saved_posts table in Supabase
    // This would require user authentication
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Post not found</h2>
          <Button onClick={handleGoBack} className="mt-4">
            Back to posts
          </Button>
        </div>
      </div>
    );
  }

  // Determine if the post is verified/fake
  const isVerified = post.isFake === "false";
  const verificationPercentage = isVerified
    ? post.real_percentage
    : post.fake_percentage;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back button */}
      <Button
        variant="ghost"
        className="mb-6 text-blue-600 hover:text-blue-800 hover:bg-blue-50 -ml-2"
        onClick={handleGoBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all posts
      </Button>

      {/* Post header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Badge
            className={`
              ${
                post.subject_expertise
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              } py-1 px-3 text-sm`}
          >
            {post.subject_expertise || "Uncategorized"}
          </Badge>

          <div
            className={`rounded-full px-3 py-1 text-xs font-medium text-white shadow-md ${
              isVerified ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isVerified ? (
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified ({verificationPercentage}%)
              </div>
            ) : (
              <div className="flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Misleading ({verificationPercentage}%)
              </div>
            )}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">{post.title}</h1>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <span className="mr-4">{post.post_date}</span>
            <span>
              Author Verified: {post.author_verified === "true" ? "Yes" : "No"}
            </span>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:bg-red-50"
            >
              <Flag className="h-4 w-4 mr-1" />
              Report
            </Button>
          </div>
        </div>
      </div>

      {/* Main image */}
      <div className="relative w-full h-80 mb-8 rounded-xl overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={
              post.isFake === "true"
                ? "https://i.pinimg.com/736x/6c/c0/08/6cc0087776f947c54ab23d9526898cfb.jpg"
                : "https://i.pinimg.com/736x/8b/46/0a/8b460ad19de8a97577b341308c368870.jpg"
            }
            alt={post.title || "News verification"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div
          className={`absolute bottom-4 left-4 ${
            isVerified ? "bg-green-600" : "bg-red-600"
          } text-white px-3 py-1 rounded-full text-sm font-medium flex items-center`}
        >
          {isVerified ? (
            <>
              <CheckCircle className="h-4 w-4 mr-1" />
              Verified Information
            </>
          ) : (
            <>
              <AlertTriangle className="h-4 w-4 mr-1" />
              Misinformation Alert
            </>
          )}
        </div>
      </div>

      {/* Post content */}
      <div className="prose prose-blue max-w-none mb-8">
        <h2 className="text-xl font-semibold mb-4">Verification Analysis</h2>
        <p>{post.reasons_for_determination}</p>
      </div>

      {/* Related links */}
      {post.related_links && post.related_links.length > 0 && (
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            Related Sources:
          </h3>
          <ul className="space-y-2">
            {post.related_links.map((link, index) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                >
                  <Link className="h-4 w-4 mr-2" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cross-check sources */}
      {post.cross_check_sources && post.cross_check_sources.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Cross-Check Sources:
          </h3>
          <ul className="space-y-2">
            {post.cross_check_sources.map((source, index) => (
              <li key={index}>
                <p
                  // href={source}
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                >
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  {source}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Separator className="my-8" />

      {/* Interaction buttons */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex space-x-4">
          <Button
            variant={isUpvoted ? "default" : "outline"}
            className={
              isUpvoted
                ? "bg-blue-600 text-white cursor-pointer"
                : "text-blue-600 cursor-pointer"
            }
            onClick={handleUpvote}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Upvote {upvoteCount}
          </Button>

          <Button
            variant="outline"
            onClick={() => document.getElementById("comment-textarea")?.focus()}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Comment {comments.length}
          </Button>

          {/* New Source button */}
          <Button
            variant="outline"
            className="text-green-600 cursor-pointer"
            onClick={handleOpenSource}
          >
            <Link className="h-4 w-4 mr-2" />
            Source
          </Button>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="text-gray-600 cursor-pointer"
            onClick={handleShare}
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Comment section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Comments {comments.length}
        </h3>

        {/* Comment input */}
        <div className="flex items-start space-x-3 mb-8">
          <Avatar className="h-10 w-10 rounded-full bg-gray-200">
            <div className="relative w-full h-full">
              <Image
                src={
                  currentUser
                    ? currentUser.avatar
                    : `https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1741460346~exp=1741463946~hmac=78286e2d5bc4a2c5d05d095d4b1d14bb5f202623c93abe5b9e9e1f720fbc9715&w=740`
                }
                alt={currentUser ? currentUser.name : "Anonymous"}
                layout="fill"
                className="rounded-full"
              />
            </div>
          </Avatar>

          {currentUser ? (
            <div className="flex-1">
              <Textarea
                id="comment-textarea"
                placeholder="Add a comment..."
                className="w-full resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                value={comment}
                onChange={handleCommentChange}
              />
              <Button
                onClick={handleCommentSubmit}
                disabled={!comment.trim()}
                className={
                  !comment.trim()
                    ? "bg-gray-400 mt-1"
                    : "bg-blue-600 text-white mt-1"
                }
              >
                <Send className="h-4 w-4 mr-2" />
                Comment
              </Button>
            </div>
          ) : (
            <div className="flex-1">
              <Button onClick={() => router.push("/login")} className="w-full">
                Login to comment
              </Button>
            </div>
          )}
        </div>

        {/* Comments list */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Be the first to comment!
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200">
                  <div className="relative w-full h-full">
                    <Image
                      src={comment.avatar}
                      alt={comment.author}
                      layout="fill"
                      className="rounded-full"
                    />
                  </div>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">
                      {comment.author}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {comment.time}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-2">{comment.text}</p>

                  {/* <div className="flex items-center text-xs text-gray-500 space-x-4">
                    <button className="flex items-center hover:text-blue-600">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {comment.upvotes}
                    </button>

                    <button className="hover:text-blue-600">Reply</button>
                  </div> */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

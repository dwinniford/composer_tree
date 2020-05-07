class NotesController < ApplicationController
  before_action :set_note, only: [:show, :update, :destroy]

  # GET /notes
  def index
    @notes = Note.all

    render json: @notes
  end

  # GET /notes/1
  def show
    render json: @note
  end

  # POST /notes
  def create
    @tree = Tree.find(params[:tree_id])
    @note = @tree.notes.build(note_params)

    if @note.save
      render json: @note
      # , status: :created, location: @note
      # what does the above code do
      # 500 Internal Server Error in 126ms (ActiveRecord: 2.0ms | Allocations: 38385)
      # NoMethodError (undefined method `note_url' for #<NotesController:0x00007fffe88c5240>):  
      # seems like the scaffold created some methods that don't know notes is a nested resource
      end
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /notes/1
  def update
    if @note.update(note_params)
      render json: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # DELETE /notes/1
  def destroy
    @note.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_note
      @note = Note.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def note_params
      params.require(:note).permit(:title, :description, :starred, :parent_note_id, :user_id)
    end
end
